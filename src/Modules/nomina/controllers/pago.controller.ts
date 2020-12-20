import 
{ 
	Controller, 
	Response, 
	Body,
	Get,
	Post,
	Put,
	Delete 
} from '@nestjs/common';
import
{
	responseInterface
}from '../../../Response/interfaces/interfaces.index';

@Controller('nomina/pago')
export class PagoController 
{
	@Get('hello')
	async sayHello(@Response() res:any):Promise<responseInterface>
	{
		return res.status(200).json("controlador encargado del servicio de pagos a nomina")
	}
}
