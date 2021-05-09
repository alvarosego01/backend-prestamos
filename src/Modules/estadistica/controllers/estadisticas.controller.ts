import { Param, Body, Controller, Get, Post, Response, UseGuards } from '@nestjs/common';
import { responseInterface } from 'src/Response/interfaces/interfaces.index';
import { EstadisticaService } from '../services/index.services';

import { AuthGuard, PassportModule } from '@nestjs/passport';
import {RolesDecorator} from "src/Modules/role/decorators/role.decorator";
import {RoleGuard} from "src/Modules/role/guards/roleGuard.index";

@Controller('estadisticas')
export class EstadisticasController 
{
	private _Response:responseInterface;

	constructor
	(
		private _estadisticaServices:EstadisticaService
	){} 

	@Get("hello")
    async sayHello()
    {
        return "Controlador de las estadisticas, funcionando";
    }

    @RolesDecorator('ADMIN_ROLE', 'ENRUTATOR_ROLE')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get('negocios/cantidad/:enrutador')
    async countBussinesByEnrutator(@Param('enrutador') id:string, @Response() res:any): Promise<responseInterface>
    {//función que retorna la cantidad de negocios totales que maneja el enrutador
        
        this._Response = await this._estadisticaServices.countBussinesByEnrutator(id);
        return res.status(this._Response.status).json(this._Response);
    }

    @RolesDecorator('ADMIN_ROLE', 'ENRUTATOR_ROLE')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get('cobradores/cantidad/:enrutador')
    async countCollectorByEnrutator(@Param('enrutador') id:string, @Response() res:any): Promise<responseInterface>
    {//función que retorna la cantidad de cobradores totales que maneja el enrutador
        
        this._Response = await this._estadisticaServices.countCollectorByEnrutator(id);
        return res.status(this._Response.status).json(this._Response);
    }

    @RolesDecorator('ADMIN_ROLE', 'ENRUTATOR_ROLE')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get('rutas/cantidad/:enrutador')
    async countRoutesByEnrutator(@Param('enrutador') id:string, @Response() res:any): Promise<responseInterface>
    {//función que retorna la cantidad de rutas totales que maneja el enrutador
        
        this._Response = await this._estadisticaServices.countRoutesByEnrutator(id);
        return res.status(this._Response.status).json(this._Response);
    }

    @RolesDecorator('ADMIN_ROLE', 'ENRUTATOR_ROLE')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get('clientes/cantidad/:enrutador')
    async countClientByEnrutator(@Param('enrutador') id:string, @Response() res:any): Promise<responseInterface>
    {//función que retorna la cantidad de clientes totales que maneja el enrutador
        
        this._Response = await this._estadisticaServices.countClientByEnrutator(id);
        return res.status(this._Response.status).json(this._Response);
    }

    @RolesDecorator('ADMIN_ROLE')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get('admin/stats')
    async getAdminStats(@Response() res:any): Promise<responseInterface>
    {//función que retorna resumen del sistema, la cantidad de todos los datos registrados...
        
        this._Response = await this._estadisticaServices.getAllSystemResumeByAdmin();
        return res.status(this._Response.status).json(this._Response);
    }

    @RolesDecorator('ADMIN_ROLE')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get('admin/traza/stats')
    async getAdminTraceStats(@Response() res:any): Promise<responseInterface>
    {//función que retorna resumen del sistema, la cantidad de todos los datos registrados...
        
        this._Response = await this._estadisticaServices.getTraceSystemStatsByAdmin();
        return res.status(this._Response.status).json(this._Response);
    }
}
