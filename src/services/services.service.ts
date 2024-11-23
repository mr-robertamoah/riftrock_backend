import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateServiceDTO } from 'src/dto/create-service.dto';
import { FilesService } from 'src/files/files.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ServicesService {
  constructor(
    private usersService: UsersService,
    private filesService: FilesService,
    private prisma: PrismaService,
  ) {}

  async create(user, createServiceDTO: CreateServiceDTO) {
    const service = await this.prisma.service.create({
      data: {
        userId: user.id,
        name: createServiceDTO.name,
        description: createServiceDTO.description,
        details: createServiceDTO.details,
      },
    });

    if (!service)
      throw new NotImplementedException('Failed to create service.');

    let file = null;
    if (createServiceDTO.file) {
      file = await this.filesService.addFile(user, {
        file: createServiceDTO.file,
        fileDescription: createServiceDTO.fileDescription,
        morphId: service.id,
        morphType: 'Service',
      });
    }

    const result = { ...service, files: [] };
    if (file) result.files = [file];

    return result;
  }
}
