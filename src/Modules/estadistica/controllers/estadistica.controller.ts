import 
{ 
    Controller, 
    Response, 
    Body, 
    Param, 
    Get, 
    Post, 
    Put, 
    Delete 
} 
from '@nestjs/common';
import {responseInterface} from 'src/Response/interfaces/interfaces.index';

@Controller('estadistica')
export class EstadisticaController 
{
    @Get()
    async sayHello(@Response() res:any):Promise<responseInterface>
    {
        return res.status(200).json("ruta de estadistica para cobros");
    }
}
