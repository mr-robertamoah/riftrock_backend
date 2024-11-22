import { IsEmail, isStrongPassword } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  email: string;
  // @isStrongPassword()
  password: string;
  passwordConfirmation: string;
}
