import { IsString } from 'class-validator';

export class EmailDTO {
  @IsString()
  recepient: string;
  @IsString()
  subject: string;
  @IsString()
  body: string;
}
