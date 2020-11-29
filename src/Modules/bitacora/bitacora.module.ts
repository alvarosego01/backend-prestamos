import { Module } from '@nestjs/common';
import
{
    BitacoraMainController
}from "./controllers/index.controller";
import 
{
    ModelsModule
} from './models/models.module';
import 
{
    BitacoraService
} 
from './services/index.service';

@Module({
    controllers:[
        BitacoraMainController
    ],
    providers:[
        BitacoraService,
        ModelsModule,    
        BitacoraService
    ],
    imports:[
        ModelsModule
    ],
    exports:[
        BitacoraService,
        ModelsModule    
    ]
})
export class BitacoraModule {}
