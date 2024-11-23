import { Module } from '@nestjs/common';
import { DetailsService } from './details.service';
import { DetailsController } from './details.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [DetailsService],
  exports: [DetailsService],
  imports: [PrismaModule],
  controllers: [DetailsController],
})
export class DetailsModule {}
