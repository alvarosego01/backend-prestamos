import { Module } from '@nestjs/common';
import { RutasController } from "./controllers/controller.index";

@Module({
  controllers: [RutasController]
})
export class CobradoresModule {}