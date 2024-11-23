import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateServiceDTO } from 'src/dto/create-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createService(
    @Request() request,
    @Body() createServiceDTO: CreateServiceDTO,
  ) {
    return this.servicesService.create(request.user, createServiceDTO);
  }
  async updateService() {}
  async deleteService() {}
}
