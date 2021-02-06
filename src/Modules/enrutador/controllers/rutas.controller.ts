import { Response, Controller, Get, Post, Body, Put, Param, Delete, UseGuards , Request} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {SameUserAuthGuard} from 'src/Modules/auth/guards/same-user-auth.guard';
import {RolesDecorator} from 'src/Modules/role/decorators/role.decorator';
import {RoleGuard} from 'src/Modules/role/guards/role.guard';
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

    // @Get('hello')
    // sayHello()
    // {
    //     console.clear();
    //     return "Controlador de rutas activo";
    // }

    //necesito el id del enrutador para escupir todas las rutas q le pertenecen
    @RolesDecorator('ADMIN_ROLE','ENRUTATOR_ROLE')
    @UseGuards(AuthGuard('jwt'), RoleGuard, SameUserAuthGuard)
    @Get('/:id')
    async getAllRoutes(@Param('id') enrutador:string, @Request() req: any,@Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._rutaService.getAllRoutes(req.page, enrutador);
        return res.status(this._Response.status).json(this._Response);
    }

    //necesito el id del enrutador y de la ruta para obtener la ruta deseada
    @RolesDecorator('ADMIN_ROLE','ENRUTATOR_ROLE')
    @UseGuards(AuthGuard('jwt'), RoleGuard, SameUserAuthGuard)
    @Get('/:ruta/:id')
    async getOneRoute(@Param() params:string[], @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._rutaService.getOneRoute(params['id'], params['ruta']);
        return res.status(this._Response.status).json(this._Response);
    }

    //tomo el formulario de rutas y creo una nueva
    @RolesDecorator('ADMIN_ROLE','ENRUTATOR_ROLE')
    @UseGuards(AuthGuard('jwt'), RoleGuard )
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
