import { IsNotEmpty } from 'class-validator';

export class CreateServiceDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  details: string | null;
  icon: string | null;
  file: File | null;
  fileDescription: string | null;
}
