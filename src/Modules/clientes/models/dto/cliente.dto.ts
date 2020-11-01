import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class ClienteDto
{
    @IsNotEmpty()
    @IsString()
    cobrador_id: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    last_name:string

    @IsNotEmpty()
    @IsString()
    dir_domicilio:string

    @IsNotEmpty()
    @IsNumber()
    percentaje_pago:number

    @IsNotEmpty()
    @IsNumber()
    monto_prestado:number

    @IsNotEmpty()
    @IsNumber()
    concurrencia:number
    
    @IsNotEmpty()
    @IsNumber()
    last_pago:number

    @IsNotEmpty()
    @IsNumber()
    edad:number

    @IsNotEmpty()
    @IsNumber()
    tlf_fijo:number

    @IsNotEmpty()
    @IsNumber()
    celular:number

    @IsNotEmpty()
    @IsString()
    mail:string
}