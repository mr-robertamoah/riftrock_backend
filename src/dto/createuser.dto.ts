export class CreateUserDTO {
  email: string;
  password: string;
  firstName: string | null;
  lastName: string | null;
  otherNames: string | null;
}
