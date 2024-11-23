import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ContactsService],
  imports: [PrismaModule],
  controllers: [ContactsController],
})
export class ContactsModule {}
