import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateServiceDTO } from 'src/dto/create-service.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateServiceDTO } from 'src/dto/update-service.dto';
import { GetItemsDTO } from 'src/dto/get-items.dto';
import { ParseIntToNotFoundPipe } from 'src/pipes/parse-int-to-not-found-pipe';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('')
  async createService(
    @Request() request,
    @Body() createServiceDTO: CreateServiceDTO,
    @UploadedFile() file: Express.Multer.File | null,
  ) {
    return this.servicesService.create(request.user, createServiceDTO, file);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Patch('')
  async updateService(
    @Request() request,
    @Body() updateServiceDTO: UpdateServiceDTO,
    @UploadedFile() file: Express.Multer.File | null,
  ) {
    return this.servicesService.update(request.user, updateServiceDTO, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteService(
    @Request() request,
    @Param('id', ParseIntToNotFoundPipe) id: number,
  ) {
    return this.servicesService.delete(request.user, Number(id));
  }

  @Get('')
  async getServices(@Query() getServicesDTO: GetItemsDTO) {
    return this.servicesService.get(getServicesDTO);
  }
}
