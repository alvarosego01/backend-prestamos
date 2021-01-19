import {
  Controller,
  Response,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete
} from '@nestjs/common';

import 
{ 
	responseInterface 
} from 'src/Response/interfaces/interfaces.index';

import
{
	CajachicaService
} from '../services/cajachica.service';

import
{
	CreateCajaChicaDTO,
	ModifyCajaChicaDTO
} from '../models/dto/cajachica.dto'

@Controller('cajachica')
export class CajachicaController 
{
	private _Response:responseInterface;

	constructor
	(
		private _cajachicaService:CajachicaService
	){}

	@Get('hello')
	async sayHell(@Response() res:any):Promise<responseInterface>
	{
		return res.status(200).json(await this._cajachicaService.sayHello());
	}

	@Get('all/:enrutador')//metodo que retorna todas las cajas chicas asignadas atraves de un enrutador
	async getAllCajachicaByEnrutator(@Param('enrutador') id:string, @Response() res:any):Promise<responseInterface>
	{
		this._Response = await this._cajachicaService.getAllCajachicaByEnrutator(id);
		return res.status(this._Response.status).json(this._Response);
	}

	@Get('detalles/:id')//metodo que me retorna una caja chica en particular
	async getOneCajachicaByID(@Param('id') id:string, @Response() res:any):Promise<responseInterface>
	{
		this._Response = await this._cajachicaService.getOneCajachicaByID(id);
		return res.status(this._Response.status).json(this._Response);
	}

	@Post('crear')//método para crear una caja chica
	async postOneCajachica(@Body() caja:CreateCajaChicaDTO, @Response() res:any):Promise<responseInterface>
	{
		this._Response = await this._cajachicaService.postOneCajachica(caja);
		return res.status(this._Response.status).json(this._Response);
	}

	@Put('modificar')//método para modificar una caja chica desde el id del cobrador
	async putOneCajachica(@Body() caja:ModifyCajaChicaDTO, @Response() res:any):Promise<responseInterface>
	{
		this._Response = await this._cajachicaService.putOneCajachica(caja);
		return res.status(this._Response.status).json(this._Response);
	}

	@Delete('eliminar/:id')//método que me permite borrar una caja chica por ID
	async delCajachicaByID(@Param('id') id:string, @Response() res:any):Promise<responseInterface>
	{
		this._Response = await this._cajachicaService.delCajachicaByID(id);
		return res.status(this._Response.status).json(this._Response);
	}

}
