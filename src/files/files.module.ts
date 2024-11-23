import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';

@Module({
  providers: [FilesService],
  exports: [FilesService],
  imports: [AwsS3Module],
})
export class FilesModule {}
