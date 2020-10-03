import { IsNotEmpty, IsString, IsArray, IsNumber } from "class-validator";

export class RoleUserDto 
{
  @IsNotEmpty()
  @IsString()
  rol: string
}

export class responseChangeRoleDTO
{
  @IsNotEmpty()
  @IsString()
  rol: string;

  @IsNotEmpty()
  @IsArray()
  updatedAt: string[];

  @IsString()
  _test: any[];
}