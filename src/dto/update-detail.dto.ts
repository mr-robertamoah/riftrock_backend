import { IsNotEmpty } from 'class-validator';

export class UpdateDetailDTO {
  @IsNotEmpty()
  value: string;
}
