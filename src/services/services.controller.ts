import { Controller } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  async createService() {}
  async updateService() {}
  async deleteService() {}
}
