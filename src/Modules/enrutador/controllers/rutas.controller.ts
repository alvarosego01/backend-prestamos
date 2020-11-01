import { Response, Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { responseInterface } from 'src/Response/interfaces/interfaces.index';
import { RutaDto } from '../models/dto/ruta.dto';
import { RutaService } from '../services/ruta.service';

@Controller('enrutador/rutas')
export class RutasController 
{
    private _Response:responseInterface;
    
    constructor
    (
        private _rutaService:RutaService
    ){}

    @Get('hello')
    sayHello()
    {
        console.clear();
        return "Controlador de rutas activo";
    }

    //necesito el id del enrutador para escupir todas las rutas q le pertenecen
    @Get('/:enrutador')
    async getAllRoutes(@Param('enrutador') enrutador:string, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._rutaService.getAllRoutes(enrutador);
        return res.status(this._Response.status).json(this._Response);
    }

    //necesito el id del enrutador y de la ruta para obtener la ruta deseada
    @Get('/:ruta/:enrutador')
    async getOneRoute(@Param() params:string[], @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._rutaService.getOneRoute(params['ruta'], params['enrutador']);
        return res.status(this._Response.status).json(this._Response);
    }

    //tomo el formulario de rutas y creo una nueva
    @Post('crear')
    async createNewRoute(@Body() body:RutaDto, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._rutaService.createNewRoute(body);
        return res.status(this._Response.status).json(this._Response);
    }

    //tomo el mismo formulario mas el id de ruta y la modifico
    @Put('modificar/:route')
    async modifyRoute(@Param('route') route:string, @Body() body:RutaDto, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._rutaService.modOneRoute(route, body);
        return res.status(this._Response.status).json(this._Response);
    }

    //necesito el id de la ruta para borrarla
    @Delete('eliminar/:id')
    async deleteRoute(@Param('id') id:string, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._rutaService.delOneRoute(id);
        return res.status(this._Response.status).json(this._Response);
    }
    
    
}
