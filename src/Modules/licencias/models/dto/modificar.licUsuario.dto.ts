import { IsNotEmpty, IsString } from "class-validator"


export class modifyUserLicenciaDto
{
    @IsNotEmpty()
    @IsString()
    idUsuario:string

    @IsNotEmpty()
    @IsString()
    status:string
}