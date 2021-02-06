import { Module } from '@nestjs/common';
import
{
    ClientesController,
    CobrosClienteController,
    NegocioController,
    PeticionCobrosController
}
from './controllers/controllers.index';
import
{
    _CAMBIOCOBROSCHEMA,
    _CLIENTESCHEMA,
    _COBROSCHEMA,
    _NEGOCIOSCHEMA,
    _CUOTASCHEMA
}
from './models/schemas/schemas.index';
import
{

    ClienteService,
    CobrosClienteService,
    PeticionesCobrosService,
    RutaClienteService,
    NegocioService
}
from "./services/services.index";

@Module({
    imports:[_CLIENTESCHEMA, _COBROSCHEMA, _CAMBIOCOBROSCHEMA, _NEGOCIOSCHEMA, _CUOTASCHEMA],
    controllers:[ClientesController, CobrosClienteController, PeticionCobrosController, NegocioController],
    providers:[ClienteService, RutaClienteService, CobrosClienteService, PeticionesCobrosService, NegocioService],
    exports:[ClienteService, RutaClienteService, CobrosClienteService, _COBROSCHEMA]
})
export class ClientesModule {}
