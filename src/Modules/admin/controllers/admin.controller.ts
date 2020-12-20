import { Controller, Get, Post, Body, Response, Param, Put, Delete } from "@nestjs/common";
import { responseInterface } from "src/Response/interfaces/interfaces.index";
import { AdminService,AdminLicService, AdminHistService } from "../services/services.index";
import { RoleUserDto } from "../models/dto/admin.dto";
import { LicenseDto, LicenseChangeStatusDto, BitacoraDto} from "../models/dto/dto.index";
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

    @Delete("users/licencias/:id") //borrar la licencia de un usuario
    async deleteUserLicense(@Response() res:any, @Param('id') id:string):Promise<responseInterface>
    {
        this._Response = await this._licAdmin.deleteUserLicense(id);

        return res.status(this._Response.status).json(this._Response);
    }                                   

    @Get("users/licencias/:id") //ver la licencia de un usuario en particular
    async getUserLicense(@Response() res:any, @Param('id') id:string):Promise<responseInterface>
    {
        this._Response = await this._licAdmin.getUserLicense(id);

        return res.status(this._Response.status).json(this._Response);
    }

    @Put("users/licencias/:id") //modificar licencia a un usuario
    async changeStatusLic(@Body() body: LicenseChangeStatusDto, @Response() res: any, @Param('id') id:string): Promise<responseInterface>
    {
        this._Response = await this._licAdmin.changeUserLicense(body, id);

        return res.status(this._Response.status).json(this._Response);
    }

    
}