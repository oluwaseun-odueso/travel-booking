import { IsEnum, MinLength } from "class-validator";

export class CreateFlightDto {
  @MinLength(5)
  name: string;

  @IsEnum(['business', 'economy', 'vvip'], {message: "Provide a valid class"})
  class: 'business' | 'economy' | 'vvip';

  flight: string;
}
