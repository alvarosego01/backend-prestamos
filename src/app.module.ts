
import { ClassesModule } from "./Classes/classes.module";
import { ConfigModule } from "./Config/config.module";
import { MiddlewareModule } from "./Middlewares/middleware.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ScheduleModule } from '@nestjs/schedule';
// conexion con mongo

// MODULOS DE RUTAS
import {
  UsersModule,
  SearchModule,
  ChatModule,
  AdminModule,
  AuthModule,
  RoleModule,
  EnrutadorModule,
  ClientesModule,
  LicenciasModule,
  BitacoraModule,
  NominaModule,
  PermisosModule,
  CobradoresModule
} from "./Modules/Routes.module.index";

// MODULOS DE LOADING Y OTROS

// modulos de config
import { ConfigService } from "./Config/index";
import { Configuration } from "./Config/config.keys";
import { _MONGOOSEMODULE } from "./Database/mongo-config";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClassesModule,
    _MONGOOSEMODULE,
    ConfigModule,
    AuthModule,
    MiddlewareModule,
    UsersModule,
    SearchModule,
    ChatModule,
    AdminModule,
    RoleModule,
    // CobradorModule,
    EnrutadorModule,
    ClientesModule,
    LicenciasModule,
    BitacoraModule,
    NominaModule,
    PermisosModule,
    CobradoresModule
  ],
  controllers: [AppController],
  providers: [ AppService],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) {
    // console.log("que coño es esto", Configuration.PORT);
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
