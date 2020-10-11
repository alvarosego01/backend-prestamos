import { IsNotEmpty, IsString, IsArray, IsNumber } from "class-validator";

export class LicenseDto 
{
  @IsNotEmpty()
  @IsString()
  nombre:   string;
  @IsNotEmpty()
  @IsString()
  duracion: string;
  @IsNotEmpty()
  @IsString()
  usuario:  string;
  @IsNotEmpty()
  @IsString()
  admin:    string;
  @IsNotEmpty()
  @IsNumber()
  precio:   number;
  @IsNotEmpty()
  @IsString()
  status:   string;

}