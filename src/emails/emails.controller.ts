import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EmailsService } from './emails.service';
import { GetItemsDTO } from 'src/dto/get-items.dto';
import { MailgunDTO } from 'src/dto/mailgun.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EmailDTO } from 'src/dto/email.dto';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async sendEmail(@Body() emailDTO: EmailDTO) {
    return this.emailsService.send(emailDTO);
  }

  @Post('mailgun')
  async saveEmails(@Body() mailgunDTO: MailgunDTO) {
    return this.emailsService.saveEmails(mailgunDTO);
  }

  @Post('webhook')
  async handleEmail(@Body() emailData) {
    return this.emailsService.handleEmail(emailData);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async markEmails(
    @Request() request,
    @Param('id', ParseIntPipe) emailId: number,
  ) {
    return this.emailsService.markEmail(request.user, emailId);
  }

  @Get()
  async getEmails(@Param() emailDTO: GetItemsDTO) {
    return this.emailsService.get(emailDTO);
  }
}
