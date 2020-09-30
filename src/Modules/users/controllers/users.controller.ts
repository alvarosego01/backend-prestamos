import {
  Controller,
  Get,
  Body,
  Post,
  Request,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Response,
  Param,
  Put,
  Delete,
} from "@nestjs/common";

import { Users } from '../models/schemas/userSchema';

import {
  FileInterceptor,
  FileFieldsInterceptor,
  AnyFilesInterceptor,
} from "@nestjs/platform-express";

import { responseInterface } from "src/Response/interfaces/interfaces.index";

import { UsersService } from "../services/services.index";
import { UserDto } from "../models/dto/user.dto";

@Controller("users")
export class UsersController {
  _Response: responseInterface;

  constructor(private _userService: UsersService) {}

  @Get()
  getHello(): Promise<any> {
    return this._userService.getAll();
  }


  @Get(":id")
  async getOneUser(
    @Param("id") id: string,
    @Response() res: any
  ): Promise<responseInterface> 
  {
    this._Response = await this._userService.getOne(id);

    return res.status(this._Response.status).json(this._Response);
  }


  @Get()
  async getUsers(@Response() res: any): Promise<responseInterface> 
  {
    this._Response = await this._userService.getAll();

    return res.status(this._Response.status).json(this._Response);
  }

  @Post()
  async setUsers(@Body() body:Users, @Response() res:any ): Promise<responseInterface>
  {
    this._Response = await this._userService.saveUser(body);
    
    return res.status(this._Response.status).json(this._Response);
  }

  @Put(':id')
  async modifyUsers(@Body() user:UserDto, @Param('id') id:string, @Response() res:any)
  {
    this._Response = await this._userService.updateUsers(user, id);

    return res.status(this._Response.status).json(this._Response);
  }

  @Delete(':id')
  async deleteUsers(@Param('id') id:string, @Response() res:any)
  {
    this._Response = await this._userService.deleteUsers(id);

    return res.status(this._Response.status).json(this._Response);
  }
}
