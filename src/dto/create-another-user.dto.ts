import { IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateAnotherUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
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
