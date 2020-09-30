import { IsNotEmpty, IsString, IsArray, IsNumber } from "class-validator";

export class UserDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;
  
  @IsString()
  @IsNotEmpty()
  id_card: string;
  
  @IsString()
  @IsNotEmpty()
  pais: string;
  
  @IsString()
  @IsNotEmpty()
  estado: string;
  
  @IsString()
  @IsNotEmpty()
  ciudad: string;
  
  @IsString()
  @IsNotEmpty()
  dir_domicilio: string;
  
  @IsString()
  @IsNotEmpty()
  nro_movil: string;
  
  @IsString()
  @IsNotEmpty()
  nro_fijo: string;
  
  @IsNumber()
  @IsNotEmpty()
  edad: number;
  
  @IsString()
  @IsNotEmpty()
  photo: string;
  
  @IsString()
  @IsNotEmpty()
  status: string;
  
  @IsString()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  rol: string;
  
  @IsString()
  @IsNotEmpty()
  pass: string;
  
  @IsString()
  @IsNotEmpty()
  createdAt: string[];
  
  @IsString()
  @IsNotEmpty()
  updatedAt: string[];
  
  @IsString()
  @IsNotEmpty()
  last_session: string;
  
  @IsString()
  @IsNotEmpty()
  enrutator_id: string;
  
  @IsString()
  @IsNotEmpty()
  _test: any[];


}

export class responseUserDTO
{
  @IsNotEmpty()
  @IsString()
  id_card: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  pass: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsArray()
  updatedAt: string[];

  @IsString()
  _test: any[];
}