import { IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  pass: string;

  @IsNotEmpty()
  @IsString({
    // message: "$property debe ser un string"
  })
  rol: string;


}
