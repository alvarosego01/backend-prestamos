import { Injectable } from '@nestjs/common';
import 
{ 
    DateProcessService, 
    ProcessDataService 
} 
from 'src/Classes/classes.index';
import { responseInterface } from 'src/Response/interfaces/interfaces.index';
import { solicitudLicenciaDto } from '../models/dto/solictud.dto';

@Injectable()
export class ControlLicenciaService 
{
    private _Response:responseInterface;

    constructor
    (
        private _processData:ProcessDataService,
        private _dateService:DateProcessService
    ){}

    //servicio para solicitar nueva licencia
    async requireNewLicencia(solicitud:solicitudLicenciaDto):Promise<responseInterface>
    {   
        
        return this._Response;
    }
}
