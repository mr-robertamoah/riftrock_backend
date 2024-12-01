import { IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';

export class UpdateAnotherUserDTO {
  @ValidateIf(
    (o) => o.email !== null && o.email !== undefined && o.email !== '',
  )
  @IsEmail()
  email: string;
  password: string;
  @ValidateIf(
    (o) => o.password !== null && o.password !== undefined && o.password !== '',
  )
  @IsNotEmpty()
  passwordConfirmation: string;
  firstName: string | null;
  lastName: string | null;
  otherNames: string | null;
}
