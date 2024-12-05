import { Injectable } from '@nestjs/common';
import { File, ServiceFile } from '@prisma/client';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(
    private prisma: PrismaService,
    private awsS3Service: AwsS3Service,
  ) {}

  async uploadFile(fileDetails: {
    userId: number;
    file: Express.Multer.File;
    fileDescription: string;
  }) {
    const s3Result = await this.awsS3Service.uploadFile(fileDetails.file);

    const file = await this.prisma.file.create({
      data: {
        userId: fileDetails.userId,
        url: s3Result.url,
        key: s3Result.key,
        description: fileDetails.fileDescription,
        name: fileDetails.file.originalname,
      },
    });

    delete file.key;

    return file;
  }

  async deleteFile(file: File) {
    await this.awsS3Service.deleteFile(file);

    await this.prisma.file.delete({
      where: { id: file.id },
    });
  }

  async deleteServiceFile(serviceFile) {
    await this.prisma.serviceFile.delete({
      where: { id: serviceFile.id },
    });

    if (!serviceFile.file) return;

    await this.prisma.file.delete({
      where: { id: serviceFile.file.id },
    });
  }
}
