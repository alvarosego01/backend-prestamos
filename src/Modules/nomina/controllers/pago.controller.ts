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
	private _Response:responseInterface;

	@Get('hello')
	async sayHello(@Response() res:any):Promise<responseInterface>
	{
		return res.status(200).json("controlador encargado del servicio de pagos a nomina");
	}

	@Get('calculo')
	async getCalculoSalario(@Response() res:any):Promise<responseInterface>
	{
		return res.status(200).json("controlador encargado del servicio de pagos a nomina");
	} 

	@Get('historial')
	async getCalculoSalarioByEnrutator(@Response() res:any):Promise<responseInterface>
	{
		return res.status(200).json("controlador encargado del servicio de pagos a nomina");
	} 

	@Get('historial')
	async getCalculoSalarioByCobrador(@Response() res:any):Promise<responseInterface>
	{
		return res.status(200).json("controlador encargado del servicio de pagos a nomina");
	}

}
