import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateAnotherUserDTO {
  @IsOptional()
  @IsString()
  @ValidateIf(
    (o) => o.email !== null && o.email !== undefined && o.email !== '',
  )
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsString()
  password?: string;
  @IsOptional()
  @ValidateIf(
    (o) => o.password !== null && o.password !== undefined && o.password !== '',
  )
  @IsString()
  @IsNotEmpty()
  passwordConfirmation?: string;
  @IsOptional()
  @IsString()
  firstName?: string | null;
  @IsOptional()
  @IsString()
  lastName?: string | null;
  @IsOptional()
  @IsString()
  otherNames?: string | null;
}
