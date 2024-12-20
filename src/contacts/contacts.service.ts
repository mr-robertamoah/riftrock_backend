import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDTO } from 'src/dto/create-contact.dto';
import { GetItemsDTO } from 'src/dto/get-items.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(createContactDTO: CreateContactDTO) {
    return await this.prisma.contact.create({
      data: createContactDTO,
    });
  }

  async mark(user, contactId: number) {
    const contact = await this.prisma.contact.findFirst({
      where: { id: contactId },
    });

    if (!contact) throw new NotFoundException('Contact was not found.');

    return await this.prisma.contact.update({
      where: { id: contactId },
      data: { seen: true, userId: Number(user.userId) },
    });
  }

  async delete(user, contactId: number) {
    user = await this.prisma.contact.findFirst({
      where: { id: contactId },
    });

    if (['ADMIN', 'SUPER_ADMIN'].includes(user.role))
      throw new ForbiddenException('You cannot delete a contact.');

    const contact = await this.prisma.contact.findFirst({
      where: { id: contactId },
    });

    if (!contact) throw new NotFoundException('Contact was not found.');

    await this.prisma.contact.delete({
      where: { id: contactId },
    });

    return { success: true };
  }

  async get(getContactsDTO: GetItemsDTO) {
    const limit = getContactsDTO.limit ? Number(getContactsDTO.limit) : 10;
    const page = getContactsDTO.page ? Number(getContactsDTO.page) : 1;
    const take = limit;
    const skip = (page - 1) * take;

    const [contacts, total] = await Promise.all([
      this.prisma.contact.findMany({
        take,
        skip,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.contact.count(),
    ]);

    return {
      data: contacts,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }
}
