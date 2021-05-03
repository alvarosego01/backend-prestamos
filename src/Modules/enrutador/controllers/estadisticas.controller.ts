import { Param, Body, Controller, Get, Post, Response, UseGuards } from '@nestjs/common';
import { responseInterface } from 'src/Response/interfaces/interfaces.index';
import { GenerarReferidoDto } from '../models/dto/dto.index';
import { EstadisticaService } from '../services/services.index';

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
        return "Controlador de los enrutadores, funcionando";
    }

    @RolesDecorator('ADMIN_ROLE', 'ENRUTATOR_ROLE')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Post('ruta/traza/:enrutador')
    async getTraceOfRoutesByEnrutator(@Param('enrutador') id:string, @Response() res:any): Promise<responseInterface>
    {//función que retorna la traza de cantidad de rutas por dias, puede usar el front para aplicar filtros por fecha y otros
    	
        this._Response = await this._estadisticaServices.getTraceOfRoutesByEnrutator(id);
        return res.status(this._Response.status).json(this._Response);
    }
}
