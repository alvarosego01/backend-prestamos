import { Controller, Response, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { responseInterface } from 'src/Response/interfaces/interfaces.index';
import { ClienteDto } from '../models/dto/index.dto';
import { ClienteService, RutaClienteService } from '../services/services.index';

import { AuthGuard, PassportModule } from '@nestjs/passport';
import {RolesDecorator} from "src/Modules/role/decorators/role.decorator";
import {RoleGuard} from "src/Modules/role/guards/role.guard";

@Controller('clientes')
export class ClientesController 
{
    private _Response:responseInterface;

    constructor
    (
        private _clienteService:ClienteService,
        private _rutaClienteService:RutaClienteService
    ){}

    @Get('hello')
    async sayHello(@Response() res:any):Promise<responseInterface>
    {
        return res.status(200).json("Ruta de manejo de clientes activa");
    }

    @RolesDecorator('ADMIN_ROLE', 'ENRUTATOR_ROLE')
    @UseGuards(AuthGuard(), RoleGuard) 
    @Get('all/:cobrador')//obtengo los cliente pertenecientes al cobrdor
    async getAllClientes(@Param('cobrador') cobrador:string, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._clienteService.getAllClientes(cobrador);
        return res.status(this._Response.status).json(this._Response);
    }


    @RolesDecorator('ADMIN_ROLE', 'ENRUTATOR_ROLE', 'COLLECTOR_ROLE')
    @UseGuards(AuthGuard(), RoleGuard) 
    @Get(':cliente/:cobrador')//obtengo el cliente perteneciente al cobrador
    async getOneCliente(@Param() params:string[], @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._clienteService.getOneCliente(params['cliente'], params['cobrador']);
        return res.status(this._Response.status).json(this._Response);
    }

    @RolesDecorator('ADMIN_ROLE', 'ENRUTATOR_ROLE', 'ENRUTATOR_ROLE')
    @UseGuards(AuthGuard(), RoleGuard) 
    @Post('crear/:cobrador')//tomo formulario y creo un cliente
    async createNewCliente(@Param('cobrador') cobrador:string, @Body() body:ClienteDto, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._clienteService.createNewCliente(body, cobrador);
        return res.status(this._Response.status).json(this._Response);
    }

    @RolesDecorator('ADMIN_ROLE', 'ENRUTATOR_ROLE')
    @UseGuards(AuthGuard(), RoleGuard) 
    @Delete('borrar/:cliente')//tomo el id del cliente y lo borro, pero bajo confirmacion del admin
    async delOneCliente(@Param('cliente') cliente:string, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._clienteService.delOneCliente(cliente);
        return res.status(this._Response.status).json(this._Response);
    }

    @RolesDecorator('ADMIN_ROLE', 'ENRUTATOR_ROLE')
    @UseGuards(AuthGuard(), RoleGuard) 
    @Post('enlazar/:cliente/:ruta')//tomo el id del cliente y el id de la ruta y lo enlazo
    async linkToRouteOneCliente(@Param() params:string[], @Body() enlace:any, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._rutaClienteService.linkToRouteOneCliente(params['ruta'], params['cliente']);
        return res.status(this._Response.status).json(this._Response);
    }

}
