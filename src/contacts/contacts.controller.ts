import { Body, Controller, Post, Query } from '@nestjs/common';
import { CreateContactDTO } from 'src/dto/create-contact.dto';
import { ContactsService } from './contacts.service';
import { GetItemsDTO } from 'src/dto/get-items.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Post()
  async createContact(@Body() createContactDTO: CreateContactDTO) {
    return await this.contactsService.create(createContactDTO);
  }

  async markContact() {}

  async getContacts(@Query() getContactDTO: GetItemsDTO) {
    return await this.contactsService.get(getContactDTO);
  }
}
