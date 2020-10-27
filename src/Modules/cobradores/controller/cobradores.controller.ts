import { Controller, Response, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { responseInterface } from 'src/Response/interfaces/interfaces.index';

@Controller('cobradores')
export class CobradoresController 
{
    private _Response:responseInterface;

    constructor
    (

    ){}

    @Get('hello')
    async sayHello(@Response() res:any):Promise<responseInterface>
    {
        return res.status(200).json("RUTA DE COBRADORES ACTIVA");
    }

    @Get(':cobrador/resumen')
    async getResumeCobrador(@Param('cobrador') cr:string, @Response() res:any):Promise<responseInterface>
    {
        return res.status(200).json('Resumen de cobrador' + cr);
    }

}
