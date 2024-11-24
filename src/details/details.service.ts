import {
  BadRequestException,
  Injectable,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { AddDetailDTO } from 'src/dto/add-detail.dto';
import { UpdateDetailDTO } from 'src/dto/update-detail.dto';
import { PrismaService } from 'src/prisma/prisma.service';

const detailsKeys = {
  tagline: 'TAGLINE',
  taglineMessage: 'TAGLINE_MESSAGE',
  taglineShort: 'TAGLINE_SHORT',
  mission: 'MISSION',
  vision: 'VISION',
  contactMessage: 'CONTACT_MESSAGE',
  servicesMessage: 'SERVICES_MESSAGE',
};

@Injectable()
export class DetailsService {
  constructor(private prisma: PrismaService) {}

  async create(user, addDetailDTO: AddDetailDTO) {
    if (!Object.keys(detailsKeys).includes(addDetailDTO.key))
      throw new NotImplementedException('Wrong detail key provided');

    return await this.prisma.detail.create({
      data: {
        userId: Number(user.userId),
        key: addDetailDTO.key,
        value: JSON.parse(addDetailDTO.value),
      },
    });
  }

  async update(user, detailId, updateDetailDTO: UpdateDetailDTO) {
    let detail = null;
    try {
      user = await this.prisma.user.findFirst({
        where: { id: Number(user.userId) },
      });

      detail = await this.prisma.detail.findFirst({
        where: { id: Number(detailId) },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Something unfortunate happened.');
    }

    if (!detail) throw new NotFoundException('Detail not found');

    if (
      user.id != detail.userId ||
      !['ADMIN', 'SUPER_ADMIN'].includes(user.role)
    )
      throw new UnauthorizedException('You cannot update this detail.');

    return await this.prisma.detail.update({
      where: { id: detail.id },
      data: {
        value: JSON.parse(updateDetailDTO.value),
      },
    });
  }

  async delete(user, detailId) {
    let detail = null;
    try {
      user = await this.prisma.user.findFirst({
        where: { id: Number(user.userId) },
      });

      detail = await this.prisma.detail.findFirst({
        where: { id: Number(detailId) },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Something unfortunate happened.');
    }

    if (!detail) throw new NotFoundException('Detail not found');

    if (
      user.id != detail.userId ||
      !['ADMIN', 'SUPER_ADMIN'].includes(user.role)
    )
      throw new UnauthorizedException('You cannot delete this detail.');

    await this.prisma.detail.delete({
      where: { id: detail.id },
    });

    return { success: true };
  }

  async get() {
    return await this.prisma.detail.findMany();
  }
}
