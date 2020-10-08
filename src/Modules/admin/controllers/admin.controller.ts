import { Controller, Get, Post, Body, Response, Param } from "@nestjs/common";
import { responseInterface } from "src/Response/interfaces/interfaces.index";
import { AdminService } from "../services/admin.service";
import { RoleUserDto } from "../models/dto/admin.dto";
import { UserDto } from "src/Modules/users/models/dto/user.dto";

@Controller("admin")
export class AdminController 
{
    private _Response:responseInterface;

    constructor
    (
        private _admin:AdminService
    ){}

    @Get("users")
    async getUser():Promise<responseInterface>
    {
        return await this._admin.getUsers();
    }

    @Get("users/licencias")
    async getUserLicense()
    {
        return "usuarios licenciados";
    }

    @Post("users/roles/:id")
    async setRoleUser(@Body() body:RoleUserDto, @Response() res:any, @Param('id') id:string):Promise<responseInterface>
    {
        this._Response = await this._admin.setRoleUser(body,id);

        return res.status(this._Response.status).json(this._Response);
    }

    @Get("roles")
    async getRoles():Promise<responseInterface>
    {
        return await this._admin.getRoles();
    }

    @Get("licencias")
    async getSavedLicenses()
    {
        return "lincencias registradas";
    }

}