import { Injectable, NotImplementedException } from '@nestjs/common';
import { DeleteObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { File } from '@prisma/client';

@Injectable()
export class AwsS3Service {
  private readonly s3: S3Client;
  private readonly bucketName: string;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
    this.bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
  }

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<{ url: string; key: string }> {
    const key = `${uuid()}-${file.originalname}`;
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    try {
      await this.s3.send(new PutObjectCommand(params));

      return {
        url: `https://${this.bucketName}.s3.${this.configService.get<string>(
          'AWS_REGION',
        )}.amazonaws.com/${key}`,
        key,
      };
    } catch (err) {
      console.error(err);
      throw new NotImplementedException('Failed to upload file.');
    }
  }

  async deleteFile(file: File) {
    const params = {
      Bucket: this.bucketName,
      Delete: {
        Objects: [{ Key: file.key }],
      },
    };

    try {
      await this.s3.send(new DeleteObjectsCommand(params));
    } catch (err) {
      console.error(err);
      throw new NotImplementedException('Failed to delete file.');
    }
  }
}
