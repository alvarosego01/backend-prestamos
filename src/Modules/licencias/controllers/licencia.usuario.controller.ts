import { Response, Body, Controller, Get, Param, Post } from '@nestjs/common';
import {responseInterface} from 'src/Response/interfaces/interfaces.index';
import 
{
    setLicenciaUserDto, 
    modifyUserLicenciaDto
} 
from '../models/dto/dto.index';
import {LicecniaUsuarioService} from '../services/services.index';

@Controller('licencias/usuario')
export class LicenciaUsuarioController
{
    private _Response: responseInterface;

    constructor
    (
        private _LicenciaUsuarioService: LicecniaUsuarioService
    ) {}
    
    
    @Post('establecer')//ruta para establecerle la licecnia al usuario
    async setUserNewLicencia(@Body() body:setLicenciaUserDto, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._LicenciaUsuarioService.setUserNewLicencia(body);
        return res.status(this._Response.status).json(this._Response);
    }

    @Post('modificar')//modificar la licencia del usuario, buscandolo por su id
    async modifyUserLicencia(@Body() body:modifyUserLicenciaDto, @Param('usuario') usuario:string, @Response() res:any):Promise<responseInterface>
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

    @Get('buscar')//ruta para obtener todas las licencias establecidas
    async getPurchasesAllLicencias(@Response() res:any): Promise<responseInterface>
    {
        this._Response;
        return res.status(this._Response.status).json(this._Response);
    }

}
