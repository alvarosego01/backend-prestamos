import { Response, Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {responseInterface} from 'src/Response/interfaces/interfaces.index';
import 
{
    setLicenciaUserDto, 
    modifyUserLicenciaDto
} 
from '../models/dto/dto.index';
import {LicecniaUsuarioService} from '../services/services.index';

import { AuthGuard, PassportModule } from '@nestjs/passport';
import {RolesDecorator} from "src/Modules/role/decorators/role.decorator";
import {RoleGuard} from "src/Modules/role/guards/roleGuard.index";
import { STATUS } from "../models/enums/enum.index";

@Controller('licencias/usuario')
export class LicenciaUsuarioController
{
    private _Response: responseInterface;

    constructor
    (
        private _LicenciaUsuarioService: LicecniaUsuarioService
    ) {}
    
    
    @RolesDecorator('ADMIN_ROLE')
    @UseGuards(AuthGuard(), RoleGuard)
    @Post('establecer')//ruta para establecerle la licecnia al usuario
    async setUserNewLicencia(@Body() body:setLicenciaUserDto, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._LicenciaUsuarioService.setUserNewLicencia(body);
        return res.status(this._Response.status).json(this._Response);
    }

    @RolesDecorator('ADMIN_ROLE')
    @UseGuards(AuthGuard(), RoleGuard)
    @Post('modificar')//modificar la licencia del usuario, buscandolo por su id
    async modifyUserLicencia(@Body() body:modifyUserLicenciaDto, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._LicenciaUsuarioService.modifyOneLicense(body);
        return res.status(this._Response.status).json(this._Response);
    }

    @RolesDecorator('ADMIN_ROLE')
    @UseGuards(AuthGuard(), RoleGuard)
    @Get('buscar/:usuario/:licencia')//ruta para obtener licencia especifica del usuario
    async getUserLicencia(@Param() id: string[], @Response() res:any): Promise<responseInterface>
    {
        this._Response = await this._LicenciaUsuarioService.getOneLicense(id['usuario'], id['licencia']);
        return res.status(this._Response.status).json(this._Response);
    }

    @RolesDecorator('ADMIN_ROLE')
    @UseGuards(AuthGuard(), RoleGuard)
    @Get('buscar/:usuario')//ruta para obtener todas las licencias del usuario
    async getPurchasesUserLicencias(@Param('usuario') id: string, @Response() res:any): Promise<responseInterface>
    {
        this._Response = await this._LicenciaUsuarioService.getAllLicenseByUser(id);
        return res.status(this._Response.status).json(this._Response);
    }

    @RolesDecorator('ADMIN_ROLE')
    @UseGuards(AuthGuard(), RoleGuard)
    @Post('reactivar/:usuario')//ruta para obtener todas las licencias del usuario
    async reactiveUserByID(@Param('usuario') id: string, @Response() res:any): Promise<responseInterface>
    {
        this._Response = await this._LicenciaUsuarioService.modifyUserByUser(id, STATUS.ACTIVE);
        return res.status(this._Response.status).json(this._Response);
    }

    @RolesDecorator('ADMIN_ROLE')
    @UseGuards(AuthGuard(), RoleGuard)
    @Post('desactivar/:usuario')//ruta para obtener todas las licencias del usuario
    async desactiveUserByID(@Param('usuario') id: string, @Response() res:any): Promise<responseInterface>
    {
        this._Response = await this._LicenciaUsuarioService.modifyUserByUser(id, STATUS.INACTIVE);
        return res.status(this._Response.status).json(this._Response);
    }

    @RolesDecorator('ADMIN_ROLE')
    @UseGuards(AuthGuard(), RoleGuard)
    @Get('buscar')//ruta para obtener todas las licencias establecidas
    async getPurchasesAllLicencias(@Response() res:any): Promise<responseInterface>
    {
        //this._Response = await this._LicenciaUsuarioService.get;
        return res.status(this._Response.status).json(this._Response);
    }

    @RolesDecorator('ADMIN_ROLE')
    @UseGuards(AuthGuard(), RoleGuard)
    @Post('borrar/:licencia')//ruta para obtener todas las licencias del usuario
    async deleteLicenseByID(@Param('licencia') id:string, @Response() res:any): Promise<responseInterface>
    {
        this._Response = await this._LicenciaUsuarioService.deleteLicenseByID(id);
        return res.status(this._Response.status).json(this._Response);
    }

}
