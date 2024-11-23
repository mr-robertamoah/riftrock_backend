import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ServicesService],
  controllers: [ServicesController],
  imports: [UsersModule, PrismaModule],
})
export class ServicesModule {}
