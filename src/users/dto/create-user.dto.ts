import { IsEnum, MinLength, IsEmail, IsUUID, IsEmpty } from "class-validator";

export class CreateUserDto {
  @IsEmpty({message: "First name should not be empty"})
  firstName: string;

  @IsEmpty({message: "Last name should not be empty"})
  lastName: string;

  @IsEmpty({message: "email should not be empty"})
  @IsEmail()
  email: string;

  @IsEmpty({message: "Nationality should not be empty"})
  nationality: string

  password: string
}
