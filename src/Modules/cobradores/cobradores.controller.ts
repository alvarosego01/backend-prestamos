import { Controller, Response, Get, Param, Post, Body } from '@nestjs/common';
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

    @Get(':cobrador/cliente')
    async getAllCliente(@Param('cobrador') cr:string, @Response() res:any):Promise<responseInterface>
    {
        return res.status(200).json('Todos los clientes del cobrador' + cr);
    }
    
    @Get(':cobrador/:cliente')
    async getOneClente(@Param('cobrador') cr:string, @Param('cliente') ce:string, @Response() res:any):Promise<responseInterface>
    {
        return res.status(200).json('Cliente especifico del cobrador' + cr +" "+ ce);
    }

    @Post(':cobrador/cliente')
    async setOneCliente(@Param('cobrador') cr:string, @Body() body:any, @Response() res:any):Promise<responseInterface>
    {
        return res.status(200).json('Añadir cliente especifico del cobrador' + cr);
    }

    @Post(':cobrador/cliente/modificar')
    async modOneCliente(@Param('cobrador') cr:string, @Body() body:any, @Response() res:any):Promise<responseInterface>
    {
        return res.status(200).json('Añadir cliente especifico del cobrador' + cr);
    }
}
