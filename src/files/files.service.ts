import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}
  async addFile(
    user,
    fileDetails: {
      file: File;
      fileDescription: string;
      morphType: string;
      morphId: number;
    },
  ) {
    // load to aws
    // save name
    const url = '';
    await this.prisma.file.create({
      data: {
        userId: user.id,
        url,
        description: fileDetails.fileDescription,
        morphType: fileDetails.morphType,
        morphId: fileDetails.morphId,
      },
    });
  }
}
