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
} from "@nestjs/common";

import {
  FileInterceptor,
  FileFieldsInterceptor,
  AnyFilesInterceptor,
} from "@nestjs/platform-express";
import { responseInterface } from "src/Response/interfaces/interfaces.index";

import { UsersService } from "../services/services.index";

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
  ): Promise<responseInterface> {
    this._Response = await this._userService.getOne(id);

    return res.status(this._Response.status).json(this._Response);
  }


  @Get()
  async getUsers(@Response() res: any): Promise<responseInterface> {
    this._Response = await this._userService.getAll();

    return res.status(this._Response.status).json(this._Response);
  }


  // @Post("upload")
  // @UseInterceptors(AnyFilesInterceptor())
  // uploadFile(
  //   @UploadedFiles() files,
  //   @Request() req: any,
  //   @Response() res: any
  // ) {
  //   console.log(files);

  //   console.log("prueba req", req.body);

  //   res.end();
  // }
}
