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
} from "@nestjs/common";

import {
  FileInterceptor,
  FileFieldsInterceptor,
  AnyFilesInterceptor,
} from "@nestjs/platform-express";

import { UsersService } from "../services/services.index";

@Controller("users")
export class UsersController {
  constructor(private _userService: UsersService) {}

  @Get()
  getHello(): string {
    return this._userService.pruebaRuta("users");
  }

  @Post("pruebaDatos")
  async createUser(@Body() body: any, @Response() res: any): Promise<any> {
    // return await this._userService.pruebaGuardar(body);
    console.log("data que llega", body);
    // res.end();

    let resp: any = null;
    await this._userService.pruebaGuardar(body).then(
      (r) => {
        resp = r;
        console.log("recibe", r);
      },
      (err) => {
        console.log("error", err);
      }
    );

    console.log("la puta respuesta", resp);

    return res.status(resp.status).json(resp);
  }

  // @Post('formaVieja')
  // async createUser2(@Body() data: any, @Response() res: any): Promise<any> {
  //   const resp = await this._userService.pruebaGuardar2(data);

  //   console.log('la puta respuesta', resp);

  //   return res.status(resp.status).json(resp);
  // }

  @Post("upload")
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(
    @UploadedFiles() files,
    @Request() req: any,
    @Response() res: any
  ) {
    console.log(files);

    console.log("prueba req", req.body);

    res.end();
  }
}
