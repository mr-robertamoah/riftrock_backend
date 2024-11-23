import { IsNotEmpty } from 'class-validator';

export class AddDetailDTO {
  @IsNotEmpty()
  key: string;
  @IsNotEmpty()
  value: string;
}
