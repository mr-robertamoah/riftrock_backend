import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ServicesService } from './services/services.service';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private servicesServics: ServicesService,
  ) {}

  async getAll() {
    const details = await this.prisma.detail.findMany();
    const services = await this.servicesServics.get({
      limit: 10,
      page: 1,
    });

    return {
      details,
      services,
    };
  }
}
