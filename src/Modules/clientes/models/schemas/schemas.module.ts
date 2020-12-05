import { Global, Module } from '@nestjs/common';
import {_CAMBIOCOBROSCHEMA, _CLIENTESCHEMA, _NEGOCIOSCHEMA} from './schemas.index';

@Global()
@Module({
    imports:[_CAMBIOCOBROSCHEMA, _CLIENTESCHEMA, _CLIENTESCHEMA, _NEGOCIOSCHEMA],
    providers:[],
    exports:[_CAMBIOCOBROSCHEMA, _CLIENTESCHEMA, _CLIENTESCHEMA, _NEGOCIOSCHEMA]
})
export class ClienteModelsModule {}
