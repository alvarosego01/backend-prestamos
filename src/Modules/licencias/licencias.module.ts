import { Module } from '@nestjs/common';
import 
{ 
    ControlLicenciasController, 
    SolicitudLicenciaController,
    LicenciasController,
    LicenciaUsuarioController
    
} from './controllers/controllers.index';
import 
{ 
    _LICENCIASCHEMA, 
    _LICENCIASOLICITUDSCHEMA, 
    _LICENCIAUSUARIOSCHEMA
} 
from './models/schemas/index.schema';
import 
{ 
    ControlLicenciaService, 
    LicecniaUsuarioService, 
    LicenciasService, 
    SolicitudLicenciaService
} 
from './services/services.index';


@Module({
    imports:
    [
        _LICENCIASCHEMA,
       _LICENCIASOLICITUDSCHEMA,
       _LICENCIAUSUARIOSCHEMA
    ],
    controllers:
    [ 
        LicenciasController,
        SolicitudLicenciaController,
        ControlLicenciasController,
        LicenciaUsuarioController
    ],
    providers:
    [
        LicenciasService,
        ControlLicenciaService,
        SolicitudLicenciaService,
        LicecniaUsuarioService
    ]
})
export class LicenciasModule {}
