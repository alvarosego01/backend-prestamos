import { Module } from '@nestjs/common';
import { ClientesController } from './controllers/controllers.index';
import { _CLIENTESCHEMA } from './models/schemas/schemas.index';
import { ClienteService, RutaClienteService } from "./services/services.index";

@Module({
    imports:[_CLIENTESCHEMA],
    controllers:[ClientesController],
    providers:[ClienteService, RutaClienteService],
    exports:[ClienteService, RutaClienteService]
})
export class ClientesModule {}
