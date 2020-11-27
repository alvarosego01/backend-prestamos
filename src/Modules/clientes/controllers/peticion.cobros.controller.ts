import { Response, Controller, Get, Param, Post } from '@nestjs/common';
import {responseInterface} from 'src/Response/interfaces/interfaces.index';
import {PeticionesCobrosService} from '../services/services.index';

@Controller('cliente/cobros/control')
export class PeticionCobrosController 
{
    private _Response:responseInterface;

    constructor
    (
        private _peticionService:PeticionesCobrosService
    ){}

    @Get(':enrutador')
    async getAllCobrosByEnrutador(@Param('enrutador') id:string, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._peticionService.getAllCobrosByEnrutador(id);
        return res.status(this._Response.status).json(this._Response);
    }

    @Get('peticion/:peticion')
    async getOneCobrosById(@Param('peticion') id:string, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._peticionService.getOneCobrosById(id);
        return res.status(this._Response.status).json(this._Response);
    }

    @Post('confirmar/:peticion')
    async confirmarOneCobroById(@Param('peticion') id:string, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._peticionService.confirmarOneCobroById(id);
        return res.status(this._Response.status).json(this._Response);
    }

    @Post('denegar/:peticion')
    async denegarOneCobroById(@Param('peticion') id:string, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._peticionService.denegarOneCobroById(id);
        return res.status(this._Response.status).json(this._Response);
    }
}
