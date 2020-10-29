import { Controller, Get } from '@nestjs/common';

@Controller('enrutador/rutas')
export class RutasController 
{
    @Get('hello')
    sayHello()
    {
        return "Controlador de rutas activo";
    }
}
