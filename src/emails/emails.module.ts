import { Module } from '@nestjs/common';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EmailsController],
  providers: [EmailsService],
  imports: [PrismaModule],
  exports: [EmailsService],
})
export class EmailsModule {}
