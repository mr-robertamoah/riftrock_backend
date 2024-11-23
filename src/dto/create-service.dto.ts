import { IsNotEmpty } from 'class-validator';

export class CreateServiceDTO {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  details: string | null;
  file: File | null;
  fileDescription: string | null;
}
