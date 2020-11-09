import { Controller, Response, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { responseInterface } from 'src/Response/interfaces/interfaces.index';
import 
{ 
    modifyUserLicenciaDto, 
    solicitudLicenciaDto ,
    setLicenciaUserDto
} 
from '../models/dto/dto.index';
import 
{ 
    ControlLicenciaService
} 
from '../services/services.index';

@Controller('licencias/control')
export class ControlLicenciasController 
{
    private _Response:responseInterface;

    constructor
    (
        private _controlLicenciaService: ControlLicenciaService,
    ){}

    @Get('hello')
    async sayHello( @Response() res:any ):Promise<responseInterface>
    {
        return res.status(200).json("ruta de gestion y control interno de licencias gral");
    }

    @Post('reloj')//ruta que configura el sistema de reloj de conteo de dias
    async setOnOffTimer(@Body() body:any, @Response() res:any):Promise<responseInterface>
    {
        this._Response;
        return res.status(this._Response.status).json(this._Response);
    }

}
