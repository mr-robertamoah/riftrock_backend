import { IsString } from 'class-validator';

export class EmailDTO {
  @IsString()
  recepient: string;
  @IsString()
  sender: string;
  @IsString()
  subject: string;
  @IsString()
  body: string;
}
