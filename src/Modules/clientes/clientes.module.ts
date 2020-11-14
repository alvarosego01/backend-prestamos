import { Module } from '@nestjs/common';
import 
{ 
    ClientesController,
    CobrosClienteController, 
    PeticionCobrosController
} 
from './controllers/controllers.index';
import 
{ 
    _CAMBIOCOBROSCHEMA,
    _CLIENTESCHEMA, 
    _COBROSCHEMA 
} 
from './models/schemas/schemas.index';
import 
{

    ClienteService, 
    CobrosClienteService, 
    PeticionesCobrosService, 
    RutaClienteService 
} 
from "./services/services.index";

@Module({
    imports:[_CLIENTESCHEMA, _COBROSCHEMA, _CAMBIOCOBROSCHEMA],
    controllers:[ClientesController, CobrosClienteController, PeticionCobrosController],
    providers:[ClienteService, RutaClienteService, CobrosClienteService, PeticionesCobrosService],
    exports:[ClienteService, RutaClienteService, CobrosClienteService]
})
export class ClientesModule {}
