import { Response, Controller, Get, Post, Body, Put, Param, Delete, UseGuards , Request} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {SameUserAuthGuard} from 'src/Modules/auth/guards/same-user-auth.guard';
import {RolesDecorator} from 'src/Modules/role/decorators/role.decorator';
import {RoleGuard} from 'src/Modules/role/guards/role.guard';
import { responseInterface } from 'src/Response/interfaces/interfaces.index';
import {CobradorService} from '../services/cobrador.service';

@Controller('cobrador')
export class CobradorController
{
    private _Response:responseInterface;

    constructor
    (
        private _cobradorService: CobradorService
    ){}



  @RolesDecorator('ADMIN_ROLE', 'ENRUTATOR_ROLE')
  @UseGuards(AuthGuard('jwt'), RoleGuard, SameUserAuthGuard)
  @Get("byEnrouter/:id")
  async getUsersMyEnrouters(@Response() res: any, @Request() req: any, @Param("id") id: string, ): Promise<responseInterface>
  {

    this._Response = await this._cobradorService.getCollectorsByEnrouter(req.page, id);

    return res.status(this._Response.status).json(this._Response);
  }





}


