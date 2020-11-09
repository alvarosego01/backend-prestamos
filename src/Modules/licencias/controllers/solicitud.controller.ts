import { Response, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { responseInterface } from 'src/Response/interfaces/interfaces.index';
import { solicitudLicenciaDto } from '../models/dto/dto.index';
import { SolicitudLicenciaService } from '../services/services.index';

@Controller('licencias/solicitud')
export class SolicitudLicenciaController
{ 
    private _Response: responseInterface;

    constructor
    (
        private _solicitudLicenciaService: SolicitudLicenciaService
    ){}

    @Get('obtener')//ruta para pedir solictud de licencia
    async getAllRequireNewLicencia(@Response() res:any ):Promise<responseInterface>
    {
        this._Response = await this._solicitudLicenciaService.getAllRequireNewLicencia();
        return res.status(this._Response.status).json(this._Response);
    }

    @Get('obtener/:id')//ruta para pedir solictud de licencia
    async getOneRequireNewLicencia(@Param('id') id:string, @Response() res:any ):Promise<responseInterface>
    {
        this._Response = await this._solicitudLicenciaService.getOneRequireNewLicencia(id);
        return res.status(this._Response.status).json(this._Response);
    }

    @Post('postear')//ruta para pedir solictud de licencia
    async postRequireNewLicencia(@Body() body:solicitudLicenciaDto, @Response() res:any ):Promise<responseInterface>
    {
        this._Response = await this._solicitudLicenciaService.postRequireNewLicencia(body);
        return res.status(this._Response.status).json(this._Response);
    }

    @Delete('/borrar/:solicitud')//ruta para pedir solictud de licencia
    async deleteRequiredLicencia(@Param('solicitud') id:string, @Response() res:any ):Promise<responseInterface>
    {
        this._Response = await this._solicitudLicenciaService.deleteRequiredLicencia(id);
        return res.status(this._Response.status).json(this._Response);
    }
}