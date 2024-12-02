import { Injectable } from '@nestjs/common';
import { GetItemsDTO } from 'src/dto/get-items.dto';
import { MailgunDTO } from 'src/dto/mailgun.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmailsService {
  constructor(private prisma: PrismaService) {}

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
      data: emails,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }
}
