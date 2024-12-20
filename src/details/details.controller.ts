import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DetailsService } from './details.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddDetailDTO } from 'src/dto/add-detail.dto';
import { UpdateDetailDTO } from 'src/dto/update-detail.dto';
import { ParseIntToNotFoundPipe } from 'src/pipes/parse-int-to-not-found-pipe';

@Controller('details')
export class DetailsController {
  constructor(private detailsService: DetailsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createDetail(@Request() request, @Body() addDetailDTO: AddDetailDTO) {
    return await this.detailsService.create(request.user, addDetailDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateDetail(
    @Request() request,
    @Param('id', ParseIntToNotFoundPipe) id: number,
    @Body() updateDetailDTO: UpdateDetailDTO,
  ) {
    return await this.detailsService.update(request.user, id, updateDetailDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteDetail(
    @Request() request,
    @Param('id', ParseIntToNotFoundPipe) id: number,
  ) {
    return await this.detailsService.delete(request.user, id);
  }

  @Get()
  async getDetails() {
    return await this.detailsService.get();
  }
}
