import 
{ 
	Controller, 
	Response, 
	Body,
	Param,
	Get,
	Post,
	Put,
	Delete 
} from '@nestjs/common';
import
{
	responseInterface
}from '../../../Response/interfaces/interfaces.index';

import { GastosoperacionesService } from '../services/gastosoperaciones.service';

import 
{
	CreateGastosOpDTO,
	ModifyGastosOpDTO,
	RetrieveGastosOpDTO,
	DeleteGastosOpDTO
} from '../models/dto/index.dto'

@Controller('cajachica/gastos') 
export class GastosoperacionesController 
{
	private _Response:responseInterface;

	constructor
	(
		private _gastosOperacion:GastosoperacionesService
	){}

	@Get('hello')
	async hello(@Response() res:any):Promise<responseInterface>
	{
		return res.status(200).json('Ruta para controlde gastos de operaciones');
	}

	@Get('historial') //retorna datos por enrutador
	async getAllGastosOperacion(@Response() res:any, @Body() ids:RetrieveGastosOpDTO):Promise<responseInterface>
	{
		this._Response = await this._gastosOperacion.getAllGastosOperacion(ids);
		return res.status(this._Response.status).json(this._Response);
	}

	@Get('historial/detalles') //retorna un slot del historial en especifico
	async getOneGastoOperacion(@Response() res:any, @Body() ids:RetrieveGastosOpDTO):Promise<responseInterface>
	{
		this._Response = await this._gastosOperacion.getOneGastoOperacion(ids);
		return res.status(this._Response.status).json(this._Response);
	}	

	@Post('')
	async postOneGastosOperacion(@Response() res:any, @Body() body:CreateGastosOpDTO):Promise<responseInterface>
	{
		this._Response = await this._gastosOperacion.postOneGastosOperacion(body);
		return res.status(this._Response.status).json(this._Response);
	}

	@Put('')
	async putOneGastosOperacion(@Response() res:any, @Body() body:ModifyGastosOpDTO):Promise<responseInterface>
	{
		this._Response = await this._gastosOperacion.putOneGastosOperacion(body);
		return res.status(this._Response.status).json(this._Response);
	}

	@Delete('borrar')
	async deleteOneGastosOperacion(@Response() res:any, @Body() body:DeleteGastosOpDTO):Promise<responseInterface>
	{
		this._Response = await this._gastosOperacion.deleteOneGastosOperacion(body);
		return res.status(this._Response.status).json(this._Response);
	}

}
