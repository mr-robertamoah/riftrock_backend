import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ServicesModule } from './services/services.module';
import { FilesModule } from './files/files.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ConfigModule.forRoot(), ServicesModule, FilesModule, AwsS3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
