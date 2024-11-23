import { IsNotEmpty, ValidateIf } from 'class-validator';

export class UpdateUserDTO {
  password: string | null;
  @ValidateIf(
    (o) => o.password !== undefined && o.password !== null && o.password !== '',
  )
  @IsNotEmpty({ message: 'You must confirm the password.' })
  passwordConfirmation: string | null;
  firstName: string | null;
  lastName: string | null;
  otherNames: string | null;
}
