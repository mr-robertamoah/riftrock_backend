import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [ServicesService],
  exports: [ServicesService],
  controllers: [ServicesController],
  imports: [UsersModule, PrismaModule, FilesModule],
})
export class ServicesModule {}
