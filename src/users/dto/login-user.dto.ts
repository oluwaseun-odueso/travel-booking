import { IsEmpty, IsEmail } from "class-validator";

export class LoginUserDto {
  @IsEmpty({message: "email should not be empty"})
  @IsEmail()
  email: string;

  password: string
}
