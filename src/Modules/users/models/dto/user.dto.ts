import { IsNotEmpty, IsString } from "class-validator";

export class UserDto {

    @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  pass: string;

  @IsNotEmpty()
    @IsString()
  _test: any[];


}