import { Module } from '@nestjs/common';
import { EnrutadorController } from './controllers/controller.index';
import { EnrutadorService } from './services/services.index';

@Module({
  imports:[],
  controllers: [EnrutadorController],
  providers: [EnrutadorService]
})
export class EnrutadorModule {}
