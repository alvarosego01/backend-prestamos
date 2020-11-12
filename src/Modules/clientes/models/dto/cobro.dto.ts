import { IsNotEmpty, IsString, IsNumber  } from "class-validator"

export class createCobroClienteDto
{
    @IsNotEmpty()
    @IsString()
    cobrador_id:string;

    @IsNotEmpty()
    @IsString()
    cliente_id:string;

    @IsNotEmpty()
    @IsString()
    observacion:string;

    @IsNotEmpty()
    @IsString()
    monto:number;
}

export class modifyCobroClienteDto
{

    @IsNotEmpty()
    @IsString()
    _id;

    @IsNotEmpty()
    @IsString()
    observacion:string;

    @IsNotEmpty()
    @IsString()
    monto:number;

    status:string;
}