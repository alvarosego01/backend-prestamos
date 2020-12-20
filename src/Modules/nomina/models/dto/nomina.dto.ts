import {IsString, IsNumber, IsNotEmpty, IsBoolean} from "class-validator"

export class CreateNominaDTO 
{
	@IsString()
	@IsNotEmpty()
	enrutador:string
	
	@IsString()
	@IsNotEmpty()
	cobrador:string
	
	@IsString()
	@IsNotEmpty()
	banco_nombre:string
	
	@IsString()
	@IsNotEmpty()
	banco_cuenta:string
	
	@IsNumber()
	@IsNotEmpty()
	salario:number
	
	@IsString()
	@IsNotEmpty()
	observacion:string

	@IsString()
	@IsNotEmpty()
	concurrencia:string
}

export class ModifyNominaDTO
{
	@IsString()
	@IsNotEmpty()
	_id:string

	@IsString()
	@IsNotEmpty()
	banco_nombre:string
	
	@IsString()
	@IsNotEmpty()
	banco_cuenta:string
	
	@IsNumber()
	@IsNotEmpty()
	salario:number
	
	@IsString()
	@IsNotEmpty()
	observacion:string
	
	@IsBoolean()
	@IsNotEmpty()
	activo:boolean

	@IsString()
	@IsNotEmpty()
	concurrencia:string
}