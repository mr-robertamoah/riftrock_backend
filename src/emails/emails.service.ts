import {
  Injectable,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { EmailDTO } from 'src/dto/email.dto';
import { GetItemsDTO } from 'src/dto/get-items.dto';
import { MailgunDTO } from 'src/dto/mailgun.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailsService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async saveEmails(mailgunDTO: MailgunDTO) {
    const { sender, recepient, subject, body } = mailgunDTO;

    await this.prisma.email.create({
      data: {
        sender,
        subject,
        body,
        recepient,
      },
    });

    return { success: true };
  }

  async handleEmail(emailData) {
    const { sender, recipient: recepient, body, subject } = emailData;

    try {
      await this.prisma.email.create({
        data: {
          sender,
          subject,
          body,
          recepient,
        },
      });
    } catch (error) {
      console.error(error);
      throw new NotImplementedException('Email was not saved.');
    }

    return { success: true };
  }

  async send(emailDTO: EmailDTO) {
    const { recepient, body, subject } = emailDTO;

    const ses = new SESClient({
      region: this.config.get<string>('AWS_REGION'),
    });

    try {
      await ses.send(
        new SendEmailCommand({
          Source: this.config.get<string>('DANSO_EMAIL'),
          Destination: {
            ToAddresses: [recepient],
          },
          Message: {
            Subject: {
              Data: subject,
            },
            Body: {
              Text: {
                Data: body,
              },
            },
          },
        }),
      );
    } catch (error) {
      console.error(error);
      throw new NotImplementedException('Failed to send email.');
    }

    return { success: true };
  }

  async markEmail(user, emailId: number) {
    user = await this.prisma.user.findUnique({ where: { id: user.userId } });

    if (user.role === 'admin')
      throw new UnauthorizedException('You cannot mark emails as read');

    let email = await this.prisma.email.findUnique({
      where: { id: emailId },
    });

    if (!email) throw new NotFoundException('Email was not found.');

    email = await this.prisma.email.update({
      where: { id: email.id },
      data: {
        read: true,
      },
    });

    return email;
  }

  async delete(user, emailId: number) {
    user = await this.prisma.user.findUnique({ where: { id: user.userId } });

    if (user.role === 'admin')
      throw new UnauthorizedException('You cannot delete emails.');

    const email = await this.prisma.email.findUnique({
      where: { id: emailId },
    });

    if (!email) throw new NotFoundException('Email was not found.');

    await this.prisma.email.delete({
      where: { id: email.id },
    });

    return { success: true };
  }

  async get(getEmailsDTO: GetItemsDTO) {
    const limit = getEmailsDTO.limit ? Number(getEmailsDTO.limit) : 10;
    const page = getEmailsDTO.page ? Number(getEmailsDTO.page) : 1;
    const take = limit;
    const skip = (page - 1) * take;

    const [emails, total] = await Promise.all([
      this.prisma.email.findMany({
        take,
        skip,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.email.count(),
    ]);

    return {
      data: emails.map((e) => {
        const data = { ...e };
        delete data.recepient;
        data['recipient'] = e.recepient;
        return data;
      }),
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }
}
