import { Controller, Response, Get, Post, Param, Body } from '@nestjs/common';
import { responseInterface } from 'src/Response/interfaces/interfaces.index';
import 
{ 
    modifyUserLicenciaDto, 
    solicitudLicenciaDto ,
    setLicenciaUserDto
} 
from '../models/dto/dto.index';
import { ControlLicenciaService } from '../services/services.index';

@Controller('licencias/control')
export class ControlLicenciasController 
{
    private _Response:responseInterface;

    constructor
    (
        private _controlLicenciaService:ControlLicenciaService
    ){}

    @Get('hello')
    async sayHello( @Response() res:any ):Promise<responseInterface>
    {
        return res.status(200).json("ruta de gestion y control interno de licencias gral");
    }

    @Post('solicitud')//ruta para pedir solictud de licencia
    async requireNewLicencia(@Body() body:solicitudLicenciaDto, @Response() res:any ):Promise<responseInterface>
    {
        this._Response = await this._controlLicenciaService.requireNewLicencia(body);
        return res.status(this._Response.status).json(this._Response);
    }

    @Post('reloj')//ruta que configura el sistema de reloj de conteo de dias
    async setOnOffTimer(@Body() body:any, @Response() res:any):Promise<responseInterface>
    {
        this._Response;
        return res.status(this._Response.status).json(this._Response);
    }

    @Post('modificar')//modificar la licencia del usuario, buscandolo por su id
    async modifyUserLicencia(@Body() body:modifyUserLicenciaDto, @Param('usuario') usuario:string, @Response() res:any):Promise<responseInterface>
    {
        this._Response;
        return res.status(this._Response.status).json(this._Response);
    }

    @Post('establecer')//ruta para establecerle la licecnia al usuario
    async setUserLicencia(@Body() body:setLicenciaUserDto, @Response() res:any):Promise<responseInterface>
    {
        this._Response;
        return res.status(this._Response.status).json(this._Response);
    }

    @Get('buscar/:usuario/:licencia')//ruta para obtener licencia especifica del usuario
    async getUserLicencia(@Param() id: string[], @Response() res:any): Promise<responseInterface>
    {
        this._Response;
        return res.status(this._Response.status).json(this._Response);
    }

    @Get('buscar/:usuario')//ruta para obtener todas las licencias del usuario
    async getPurchasesUserLicencias(@Param('usuario') id: string, @Response() res:any): Promise<responseInterface>
    {
        this._Response;
        return res.status(this._Response.status).json(this._Response);
    }

    @Get('buscar/:usuario')//ruta para obtener todas las licencias establecidas
    async getPurchasesAllLicencias(@Response() res:any): Promise<responseInterface>
    {
        this._Response;
        return res.status(this._Response.status).json(this._Response);
    }

}
