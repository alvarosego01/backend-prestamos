import { Controller, Response, Get, Post, Param, Body } from '@nestjs/common';
import { responseInterface } from 'src/Response/interfaces/interfaces.index';
import { solicitudLicenciaDto } from '../models/dto/solictud.dto';
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

    @Post('solicitud')
    async requireNewLicencia(@Body() body:solicitudLicenciaDto, @Response() res:any ):Promise<responseInterface>
    {
        this._Response = await this._controlLicenciaService.requireNewLicencia(body);
        return res.status(this._Response.status).json(this._Response);
    }

    @Post('reloj')
    async setOnOffTimer(@Body() body:any, @Response() res:any ):Promise<responseInterface>
    {
        this._Response;
        return res.status(this._Response.status).json(this._Response);
    }
}
