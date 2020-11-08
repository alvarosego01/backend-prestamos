import { Module } from '@nestjs/common';
import 
{ 
    ControlLicenciasController, 
    LicenciasController 
    
} from './controllers/controllers.index';
import 
{ 
    _LICENCIASCHEMA, 
    _LICENCIASOLICITUDSCHEMA 
} 
from './models/schemas/index.schema';
import 
{ 
    ControlLicenciaService, 
    LicenciasService 
} 
from './services/services.index';


@Module({
    imports:
    [
        _LICENCIASCHEMA,
       _LICENCIASOLICITUDSCHEMA
    ],
    controllers:
    [ 
        LicenciasController,
        ControlLicenciasController
    ],
    providers:
    [
        LicenciasService,
        ControlLicenciaService
    ]
})
export class LicenciasModule {}
