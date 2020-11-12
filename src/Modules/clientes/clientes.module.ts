import { Module } from '@nestjs/common';
import 
{ 
    ClientesController,
    CobrosClienteController 
} 
from './controllers/controllers.index';
import 
{ 
    _CLIENTESCHEMA, 
    _COBROSCHEMA 
} 
from './models/schemas/schemas.index';
import 
{

    ClienteService, 
    CobrosClienteService, 
    RutaClienteService 
} 
from "./services/services.index";

@Module({
    imports:[_CLIENTESCHEMA, _COBROSCHEMA],
    controllers:[ClientesController, CobrosClienteController],
    providers:[ClienteService, RutaClienteService, CobrosClienteService],
    exports:[ClienteService, RutaClienteService, CobrosClienteService]
})
export class ClientesModule {}
