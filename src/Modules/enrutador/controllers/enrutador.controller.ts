import { Body, Controller, Get, Post, Response } from '@nestjs/common';
import { responseInterface } from 'src/Response/interfaces/interfaces.index';
import { GenerarReferidoDto } from '../models/dto/dto.index';
import { EnrutadorService } from '../services/services.index';

@Controller('enrutador')
export class EnrutadorController 
{
    private _Response:responseInterface;

    constructor
    (
        private _enrutadorService:EnrutadorService
    ){}

    @Get("hello")
    async sayHello()
    {
        return "Controlador de los enrutadores, funcionando";
    }

    @Post('referencia')
    async generarReferencia(@Body() body:GenerarReferidoDto, @Response() res:any): Promise<responseInterface>
    {
        this._Response = await this._enrutadorService.generarReferido(body);
        return res.status(this._Response.status).json(this._Response);
    } 

    //@Post("referir")
    //async registrarReferido()
}
