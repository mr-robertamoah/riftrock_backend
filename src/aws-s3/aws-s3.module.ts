import { Module } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [AwsS3Service],
  exports: [AwsS3Service],
  imports: [ConfigModule.forRoot()],
})
export class AwsS3Module {}
