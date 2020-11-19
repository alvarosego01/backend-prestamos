
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
  UsePipes,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {RolesDecorator} from "src/Modules/role/decorators/role.decorator";
import {RoleGuard} from "src/Modules/role/guards/role.guard";


import {responseInterface} from "src/Response/interfaces/interfaces.index";
import {SearchService} from "../services/search.service";

@Controller("search")
export class SearchController {

  _Response: responseInterface;

  constructor(private _searchService: SearchService) { }

  @Get("users/:arg")
  async searchGetUser(
    @Param("arg") arg: string,
    @Response() res: any
  ): Promise<responseInterface> {

    this._Response=await this._searchService.searchGetUser(arg);

    return res.status(this._Response.status).json(this._Response);
  }


  @RolesDecorator('ADMIN_ROLE')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get("usersEnrouters/:arg")
  async searchGetUserEnrrouter(
    @Param("arg") arg: string,
    @Response() res: any
  ): Promise<responseInterface> {

    this._Response=await this._searchService.searchGetUserEnrrouter(arg);

    return res.status(this._Response.status).json(this._Response);
  }


}
