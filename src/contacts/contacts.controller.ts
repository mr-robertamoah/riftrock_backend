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
  UseGuards,
} from '@nestjs/common';
import { CreateContactDTO } from 'src/dto/create-contact.dto';
import { ContactsService } from './contacts.service';
import { GetItemsDTO } from 'src/dto/get-items.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ParseIntToNotFoundPipe } from 'src/pipes/parse-int-to-not-found-pipe';

@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Post('')
  async createContact(@Body() createContactDTO: CreateContactDTO) {
    return await this.contactsService.create(createContactDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async markContact(
    @Request() request,
    @Param('id', ParseIntToNotFoundPipe) id: number,
  ) {
    return await this.contactsService.mark(request.user, Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteContact(
    @Request() request,
    @Param('id', ParseIntToNotFoundPipe) id: number,
  ) {
    return await this.contactsService.delete(request.user, Number(id));
  }

  @Get('')
  async getContacts(@Query() getContactDTO: GetItemsDTO) {
    return await this.contactsService.get(getContactDTO);
  }
}
