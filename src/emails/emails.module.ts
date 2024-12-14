import { Module } from '@nestjs/common';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [EmailsController],
  providers: [EmailsService],
  imports: [PrismaModule, ConfigModule],
  exports: [EmailsService],
})
export class EmailsModule {}
