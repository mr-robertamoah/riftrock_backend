import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateServiceDTO } from 'src/dto/create-service.dto';
import { UpdateServiceDTO } from 'src/dto/update-service.dto';
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

  async create(
    user,
    createServiceDTO: CreateServiceDTO,
    uploadedFile: Express.Multer.File,
  ) {
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
    if (uploadedFile) {
      file = await this.filesService.uploadFile(user, {
        file: uploadedFile,
        fileDescription: createServiceDTO.fileDescription,
        morphId: service.id,
        morphType: 'Service',
      });
    }

    const result = { ...service, files: [] };
    if (file) result.files = [file];

    return result;
  }

  async update(
    user,
    updateServiceDTO: UpdateServiceDTO,
    uploadedFile: Express.Multer.File,
  ) {
    let service = await this.prisma.service.findFirst({
      where: { id: Number(updateServiceDTO.serviceId) },
    });

    if (!service) throw new NotFoundException('Service not found.');

    if (service.userId != user.id)
      throw new ForbiddenException(
        'You do not have permission to update this service.',
      );

    if (
      !updateServiceDTO.name &&
      !updateServiceDTO.description &&
      !updateServiceDTO.details &&
      !uploadedFile
    )
      throw new NotImplementedException('Insufficient data to update service.');

    const data = {};

    if (updateServiceDTO.name) data.name = updateServiceDTO.name;
    if (updateServiceDTO.description)
      data.description = updateServiceDTO.description;
    if (updateServiceDTO.details) data.details = updateServiceDTO.details;

    if (Object.keys(data).length > 0) {
      service = await this.prisma.service.update({
        where: { id: Number(updateServiceDTO.serviceId) },
        data: data,
        include: { files: true },
      });

      if (!service)
        throw new NotImplementedException('Failed to update service.');
    }

    let file = null;
    if (uploadedFile && service.files.length)
      await this.filesService.deleteFile(service.files[0]);

    if (uploadedFile) {
      file = await this.filesService.uploadFile(user, {
        file: uploadedFile,
        fileDescription: updateServiceDTO.fileDescription,
        morphId: service.id,
        morphType: 'Service',
      });
    }

    const result = { ...service, files: [] };
    if (file) result.files = [file];

    return result;
  }

  async delete(user, serviceId: number) {
    const service = await this.prisma.service.findFirst({
      where: { id: Number(serviceId) },
      include: { files: true },
    });

    if (!service) throw new NotFoundException('Service not found.');

    if (service.userId != user.id)
      throw new ForbiddenException(
        'You do not have permission to delete this service.',
      );

    if (service.files.length)
      await this.filesService.deleteFile(service.files[0]);

    await this.prisma.service.delete({
      where: { id: Number(serviceId) },
    });

    return { success: true };
  }
}
