import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import 
{ 
	_configPaginator, 
	_dataPaginator, 
	_argsPagination, 
	_argsUpdate
} from 'src/Response/interfaces/interfaces.index';

import 
{ 
	responseInterface, 
	_argsFind 
} from "src/Response/interfaces/interfaces.index";

import 
{ 
	ProcessDataService, 
	DateProcessService 
} from "src/Classes/classes.index"; 

import 
{ 
	Nomina,
	Banco,
	Salario 
} from "../models/schemas/nomina.schema";

import 
{ 
	CajaChica,
	GastosOperacion 
} from "../models/schemas/cajachica.schema";

import { NominaService } from "./nomina.service";
import { CajachicaService } from "./cajachica.service";
import
{
	GetSalarioNominaDTO
} from "../models/dto/index.dto";

@Injectable()
export class PagoService 
{
	private _Response:responseInterface;
	private _GastosOper:GastosOperacion[];
	private _Nomina:Nomina;
	private _Cajachica:CajaChica;

	constructor
	(
		@InjectModel(Nomina.name) private NominaModel:Model<Nomina>,
		@InjectModel(Salario.name) private SalarioModel:Model<Salario>,
		@InjectModel(CajaChica.name) private CajachicaModel:Model<CajaChica>,
		@InjectModel(GastosOperacion.name) private GastosOpModel:Model<GastosOperacion>,
		private _nominaService:NominaService,
		private _cajachService:CajachicaService,
		private _processData: ProcessDataService, 
    	private _dateProcessService: DateProcessService
	)
	{}

	//funcion que toma los gastos de operacion y la nomina para calcular las prestaciones
	private async getTotalGastosOperByCobrador(gastos:GastosOperacion[], nomina:Nomina)
	{
		let back_Point = Array();
		let totalGastos:number = 0.0;
		let lastPayment:any;
		let totalDays:number = 0;

		//sino tiene fwecha de pago anterior se calcula en base a fecha actual
		if (!nomina.last_pago) 
		{
			lastPayment = this._dateProcessService.getBackpointInTime(nomina.concurrencia) 
			totalDays = nomina.concurrencia;
		}else
		{
			lastPayment = nomina.last_pago;
			totalDays = this._dateProcessService.getDiffInDays(this._dateProcessService.getBackpointInTime(nomina.concurrencia));
		}

		//(!nomina.last_pago)? lastPayment = this._dateProcessService.getBackpointInTime(nomina.concurrencia) : lastPayment = nomina.last_pago;

		//obtengo el array de fechas entre dos ptos
		back_Point = this._dateProcessService.getNextPointToPointInTime(totalDays, lastPayment);

		//ahora sacaré todos los datos y acumularé los gastos presentes en ese rango de fechas
		await gastos.filter(gastoOP =>
		{
			for (let i = 0; i <= back_Point.length; ++i) 
			{
				if( gastoOP.createdAt[1] == back_Point[i]) 
				{
					totalGastos = totalGastos + gastoOP.monto;
				}
			}
		});

		return totalGastos;
	}

	//funcion que setea el pago del cobrador
	private async setLastSalaryPayment(saldo:number, gasto:number)
	{
		let  newPaytment:Salario = new this.SalarioModel({'monto': saldo, 'gasto': gasto});

		//si el array es nulo, lo inicializo con este operador ternario
		(!this._Nomina.pago)? this._Nomina.pago = Array() : true;
		(!this._Nomina.last_pago)? this._Nomina.last_pago = Array() : true;
		(!this._Nomina.next_pago)? this._Nomina.next_pago = Array() : true;

		this._Nomina.pago.push(newPaytment); 
		this._Nomina.last_pago.push(this._dateProcessService.getShortDate());
		this._Nomina.next_pago.push(this._dateProcessService.getNextPointInTime(this._Nomina.concurrencia));
	}

	private async getOneNominaSalario(ids:GetSalarioNominaDTO)
	{
		this._Response = await this._nominaService.getOneNomina(ids.nomina_id);
		this._Nomina = this._Response.data;

		if (!this._Nomina) 
		{
			return this._Response;
		}
	}

	private async getOneCajachicha(ids:GetSalarioNominaDTO)
	{
		this._Response = await this._cajachService.getOneCajachicaByID(ids.cajachica_id);
		this._Cajachica = this._Response.data;

		if (!this._Cajachica) 
		{
			return this._Response; 
		}
	}

	//obtengo todas las nominas
	private async getAllNominas(ids:GetSalarioNominaDTO)
	{
		const args: _argsPagination = {
    	  findObject: {enrutador:ids.enrutador_id},
    	  options: null
    	}

    	await this._processData._AllFindDB(this.NominaModel, args).then(r => 
    	{
    	  this._Response = r;
    	}, err => 
    	{
    	  this._Response = err;
    	});

    	return this._Response;
	} 

	private async getAllCajaChica(ids:GetSalarioNominaDTO)
	{
		const args: _argsPagination = {
    	  findObject: {enrutador:ids.enrutador_id}, 
    	  options: null
    	}

    	await this._processData._AllFindDB(this.CajachicaModel, args).then(r => 
    	{
    	  this._Response = r;
    	}, err => 
    	{
    	  this._Response = err;
    	});

    	return this._Response;
	} 

	async getCalculoSalarioByCobrador(ids:GetSalarioNominaDTO):Promise<responseInterface>
	{
		//obtengo la caja chica y la nomina
		await this.getOneNominaSalario(ids);
		await this.getOneCajachicha(ids);
		//_Valor Gastos Adquiridos
		let _VGA = await this.getTotalGastosOperByCobrador(this._Cajachica.gasto, this._Nomina); 
		//seteo de salario al cobrador
		await this.setLastSalaryPayment((this._Nomina.salario - _VGA), _VGA);
		this._Response.data = this._Nomina;

		return this._Response;
	}

	async getCalculoSalarioByEnrutador(ids:GetSalarioNominaDTO):Promise<responseInterface>
	{
    	let _nominaAux:Nomina[] = Array();
    	let _cajaChica:CajaChica[] = Array();

		await this.getAllCajaChica(ids); _cajaChica = this._Response.data;
		await this.getAllNominas(ids); _nominaAux = this._Response.data;

		if(_nominaAux.length == 0)
		{
			this._Response.message 	= "No hay datos para validar pagos";
			this._Response.status 	= 404;
			this._Response.data 	= null
		}

		await _nominaAux.forEach((nomina, index)=>
		{
			console.log('Numero de nomina:', index);

		});

		console.clear();
		console.log(_cajaChica, _nominaAux);
		return this._Response;
	}


}
