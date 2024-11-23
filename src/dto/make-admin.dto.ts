import { IsNotEmpty } from 'class-validator';

export class MakeAdminDTO {
  @IsNotEmpty()
  userId: number;
}
