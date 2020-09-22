import { IsNotEmpty, IsString, IsObject } from 'class-validator';

export class sessionDTO {
    @IsNotEmpty()
    @IsString()
    _id: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;


    @IsNotEmpty()
    @IsString({
      // message: "$property debe ser un string"
    })
    rol: string;


    @IsNotEmpty()
    @IsString({
      // message: "$property debe ser un string"
    })
    token: string;

    @IsNotEmpty()
    @IsObject()
    userMenu: any;







}
