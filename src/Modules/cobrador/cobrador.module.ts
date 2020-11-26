import { Module } from '@nestjs/common';
import {CobradorController} from './controllers/cobrador.controller';
import {CobradorService} from './services/cobrador.service';


@Module({
//   imports:[RutaModule],
  controllers: [CobradorController],
  providers: [ CobradorService ]
})
export class CobradorModule {}
