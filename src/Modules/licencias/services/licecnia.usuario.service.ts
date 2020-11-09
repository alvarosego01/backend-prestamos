import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import 
{
    ProcessDataService, 
    DateProcessService
} 
from 'src/Classes/classes.index';
import 
{ 
    responseInterface 
} 
from 'src/Response/interfaces/interfaces.index';
import {setLicenciaUserDto} from '../models/dto/dto.index';
import {LicenciaUsuario} from '../models/schemas/index.schema';

@Injectable()
export class LicecniaUsuarioService
{ 
    private _Response: responseInterface;

    constructor
    (
        @InjectModel(LicenciaUsuario.name) private _licenciaUsuarioModel:Model<LicenciaUsuario>,
        private _processData:ProcessDataService,
        private _dateService: DateProcessService,
    ) {}

    async setUserNewLicencia(licencia:setLicenciaUserDto): Promise<responseInterface>
    {
        const data = new this._licenciaUsuarioModel(licencia);

        await this._processData._saveDB(data).then(r =>
        {
            this._Response = r;
        }, err =>
        {
            this._Response = err;
        }); 

        return this._Response;
    }
}
