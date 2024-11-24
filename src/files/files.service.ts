import { Injectable } from '@nestjs/common';
import { File } from '@prisma/client';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(
    private prisma: PrismaService,
    private awsS3Service: AwsS3Service,
  ) {}

  async uploadFile(
    user,
    fileDetails: {
      file: Express.Multer.File;
      fileDescription: string;
      morphType: string;
      morphId: number;
    },
  ) {
    const s3Result = await this.awsS3Service.uploadFile(fileDetails.file);

    const file = await this.prisma.file.create({
      data: {
        userId: Number(user.userId),
        url: s3Result.url,
        key: s3Result.key,
        description: fileDetails.fileDescription,
        morphType: fileDetails.morphType,
        morphId: fileDetails.morphId,
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
}
