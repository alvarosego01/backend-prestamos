import { IsNotEmpty, IsString, IsNumber } from "class-validator"

export class solicitudLicenciaDto
{
    @IsNotEmpty()
    @IsString()
    idUsuario:string
}

export class setLicenciaUserDto
{
    @IsNotEmpty()
    @IsString()
    idUsuario:string

    @IsNotEmpty()
    @IsString()
    idLicencia:string

    @IsNotEmpty()
    @IsString()
    dias:number

    @IsNotEmpty()
    @IsString()
    status:string
}