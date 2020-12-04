import 
{ 
    Controller,
    Response,
    Body,
    Get,
    Post
} 
from '@nestjs/common';
import {responseInterface} from 'src/Response/interfaces/interfaces.index';
import {BitacoraDto, GetReportDto} from '../models/dto/index.dto';
import {Type} from '../models/enum/index.enum';
import {BitacoraService} from '../services/index.service';

@Controller('bitacora')
export class BitacoraMainController 
{
    private _Response:responseInterface;

    constructor
    (
        private _bitacoraService:BitacoraService
    ){}

    @Get('hello')
    async sayHello(@Response() res:any): Promise<responseInterface>
    {
        return res.status(200).json("Ruta de modulos de bitácoras");
    }

    @Get('report')//ruta para obtener los reporte por role
    async getReportLog(@Body() log:GetReportDto ,@Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._bitacoraService.getReportLog(log);
        return res.status(this._Response.status).json(this._Response);
    }

    @Get('report/all')//ruta solo administrativa, para obtener TODOS los roles
    async getAllReportLog(@Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._bitacoraService.getAllReportLog();
        return res.status(this._Response.status).json(this._Response);
    }

    @Get('report/detalles')//ruta para obtener los reporte por role
    async getOneReportLog(@Body() log:GetReportDto ,@Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._bitacoraService.getOneReportLog(log);
        return res.status(this._Response.status).json(this._Response);
    }

    @Post('admin')
    async makeLogAdmin(@Body() log:BitacoraDto, @Response() res:any):Promise<responseInterface>
    {
        log.type = Type.ADMIN;
        this._Response = await this._bitacoraService.generateLog(log);
        return res.status(this._Response.status).json(this._Response);
    }

    @Post('enrutador')
    async makeLogEnrutador(@Body() log:BitacoraDto, @Response() res:any):Promise<responseInterface>
    {
        log.type = Type.ENRUTADOR;
        this._Response = await this._bitacoraService.generateLog(log);
        return res.status(this._Response.status).json(this._Response);
    }

    @Post('cobrador')
    async makeLogCobrador(@Body() log:BitacoraDto, @Response() res:any):Promise<responseInterface>
    {
        log.type = Type.COBRADOR;
        this._Response = await this._bitacoraService.generateLog(log);
        return res.status(this._Response.status).json(this._Response);
    }
}
