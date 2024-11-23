import {
  Body,
  Controller,
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

@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Post('')
  async createContact(@Body() createContactDTO: CreateContactDTO) {
    return await this.contactsService.create(createContactDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('{id}')
  async markContact(@Request() request, @Param() id) {
    return await this.contactsService.markContact(request.user, Number(id));
  }

  @Get('')
  async getContacts(@Query() getContactDTO: GetItemsDTO) {
    return await this.contactsService.get(getContactDTO);
  }
}
