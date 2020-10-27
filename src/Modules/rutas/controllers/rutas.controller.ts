import { Controller, Response, Param, Body, Get, Post, Delete, Put } from '@nestjs/common';
import { responseInterface } from 'src/Response/interfaces/interfaces.index';

@Controller('cobradores')
export class RutasController 
{
    private _Response:responseInterface;

    constructor
    (

    ){}

    @Get('hello')
    async sayHello(@Response() res:any):Promise<responseInterface>
    {
       return res.status(200).json("Control de rutas, ACTIVO");
    }

    @Get("rutas/home")
    async getAllRoutes(@Response() res:any):Promise<responseInterface>
    {
        return res.status(200).json("Retorno todas las rutas del sistema y soy una ruta administrativa")
    }

    @Get("rutas/:cobrador")
    async getAllRoutesCobrador(@Param("cobrador") cr:string, @Response() res:any):Promise<responseInterface>
    {
        return res.status(200).json("Retorno todas las rutas asignadas al cobrador");
    }

    @Get("rutas/:cobrador/:ruta")
    async getOneRouteCobrador(@Param("cobrador") cr:string, @Param("ruta") ra:string, @Response() res:any):Promise<responseInterface>
    {
        return res.status(200).json("Retorno todas las rutas asignadas al cobrador");
    }
}