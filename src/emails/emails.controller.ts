import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { GetItemsDTO } from 'src/dto/get-items.dto';
import { MailgunDTO } from 'src/dto/mailgun.dto';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Post('mailgun')
  async saveEmails(@Body() mailgunDTO: MailgunDTO) {
    return this.emailsService.saveEmails(mailgunDTO);
  }

  @Get()
  async getEmails(@Param() emailDTO: GetItemsDTO) {
    return this.emailsService.get(emailDTO);
  }
}
