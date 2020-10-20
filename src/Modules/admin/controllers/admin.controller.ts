import { Controller, Get, Post, Body, Response, Param, Put, Delete } from "@nestjs/common";
import { responseInterface } from "src/Response/interfaces/interfaces.index";
import { AdminService,AdminLicService, AdminHistService } from "../services/services.index";
import { RoleUserDto } from "../models/dto/admin.dto";
import { LicenseDto, LicenseChangeStatusDto, BitacoraDto } from "../models/dto/dto.index";
import { BitacoraInterface } from "../models/interfaces/bitacora.interface";
import { ActionAdmin, ActionDescp } from "../models/actionTypes.enum";


@Controller("admin")
export class AdminController 
{
    private _Response:responseInterface;

    constructor
    (
        private _admin:AdminService,
        private _licAdmin:AdminLicService,
        private _histAdmin:AdminHistService
    ){}
        
    @Get("users")
    async getUser(@Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._admin.getUsers();
        
        return res.status(this._Response.status).json(this._Response);
    }

    @Get("users/roles")
    async getRoles(@Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._admin.getRoles();

        return res.status(this._Response.status).json(this._Response);
    }

    @Post("users/roles/:id")
    async setRoleUser(@Body() body:RoleUserDto, @Response() res:any, @Param('id') id:string):Promise<responseInterface>
    {
        this._Response = await this._admin.setRoleUser(body,id);

        return res.status(this._Response.status).json(this._Response);
    }

    @Get("users/licencias")
    async getSavedLicenses(@Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._licAdmin.getLicense();

        return res.status(this._Response.status).json(this._Response);
    }

    @Post("users/licencias")
    async setUsers(@Body() body: LicenseDto, @Response() res: any): Promise<responseInterface>
    {
        this._Response = await this._licAdmin.setUserLicense(body);

        return res.status(this._Response.status).json(this._Response);
    }

    @Delete("users/licencias/:id")
    async deleteUserLicense(@Response() res:any, @Param('id') id:string):Promise<responseInterface>
    {
        this._Response = await this._licAdmin.deleteUserLicense(id);

        return res.status(this._Response.status).json(this._Response);
    }                                   

    @Get("users/licencias/:id")
    async getUserLicense(@Response() res:any, @Param('id') id:string):Promise<responseInterface>
    {
        this._Response = await this._licAdmin.getUserLicense(id);

        return res.status(this._Response.status).json(this._Response);
    }

    @Put("users/licencias/:id")
    async changeStatusLic(@Body() body: LicenseChangeStatusDto, @Response() res: any, @Param('id') id:string): Promise<responseInterface>
    {
        this._Response = await this._licAdmin.changeUserLicense(body, id);

        return res.status(this._Response.status).json(this._Response);
    }

    @Get("bitacora")
    async getBitacoraAdmin(@Response() res: any): Promise<responseInterface>
    {
        this._Response = await this._histAdmin.getBitacora();

        return res.status(this._Response.status).json(this._Response);
    }

    private body:BitacoraInterface;
    @Post("bitacora")
    async setBitacora( @Response() res: any)
    {
        this.body = new BitacoraDto;
        this.body.status = ActionAdmin.LICENSE;
        this.body.admin = "5f74f168e6e4cd1f64bf0b93";
        this.body.usuario = "5f74f168e6e4cd1f64bf0b93";
        this.body.descripcion = ActionDescp.SET_LICENSE;

        console.log("ActionAdmin", this.body, " ", this._histAdmin.setBitacora(this.body));
        
        return res.status(200).json(this.body);
    }
}