import { Response, Controller, Get, Body, Post, Put, Delete } from '@nestjs/common';
import {responseInterface} from 'src/Response/interfaces/interfaces.index';
import 
{
    NegocioCreacionDto, 
    NegocioModificacionDto, 
    NegocioPeticionDto,
    NegocioUnicoPeticionDto
} 
from '../models/dto/index.dto';
import {NegocioService} from '../services/services.index';

@Controller('negocio')
export class NegocioController 
{
    private _Response:responseInterface;

    constructor
    ( 
        private _negocioService:NegocioService
    ){}

    @Get('hello')
    async sayHello(@Response() res:any):Promise<responseInterface>
    {
        return res.status(200).json("ruta para asigancion e negocios de clientes");
    }

    @Get()//ruta para obtener todos los negocios de un cliente 
    async getAllNegocio(@Response() res:any, @Body() value:NegocioPeticionDto):Promise<responseInterface>
    {
        this._Response = await this._negocioService.getAllNegocio(value);
        return res.status(this._Response.status).json(this._Response);
    }

    @Get()//ruta para obtener un negocio hecho por el cliente
    async getOneNegocio(@Response() res:any, @Body() value:NegocioUnicoPeticionDto):Promise<responseInterface>
    {
        this._Response = await this._negocioService.getOneNegocio(value);
        return res.status(this._Response.status).json(this._Response);
    }

    @Post('crear')
    async makeOneNegocio(@Response() res:any, @Body() value:NegocioCreacionDto):Promise<responseInterface>
    {
        this._Response = await this._negocioService.makeOneNegocio(value);
        return res.status(this._Response.status).json(this._Response);
    }

    @Put('modificar')
    async modifyOneNegocio(@Response() res:any, @Body() value:NegocioModificacionDto):Promise<responseInterface>
    {
        this._Response = await this._negocioService.modifyOneNegocio(value);
        return res.status(this._Response.status).json(this._Response);
    }

    @Delete('eliminar')
    async deleteOneNegocio(@Response() res:any, @Body() value:any):Promise<responseInterface>
    {
        //this._Response = await ;
        return res.status(this._Response.status).json(this._Response);
    }
}
