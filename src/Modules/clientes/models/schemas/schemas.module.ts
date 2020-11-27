import { Global, Module } from '@nestjs/common';
import {_CAMBIOCOBROSCHEMA, _CLIENTESCHEMA} from './schemas.index';

@Global()
@Module({
    imports:[_CAMBIOCOBROSCHEMA, _CLIENTESCHEMA],
    providers:[],
    exports:[_CAMBIOCOBROSCHEMA, _CLIENTESCHEMA]
})
export class ClienteModelsModule {}
