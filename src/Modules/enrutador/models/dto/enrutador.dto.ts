import { IsNotEmpty, IsString } from "class-validator";

export class GenerarReferidoDto 
{

    @IsNotEmpty({"message": "no debe dejar este elemento vacio"})
    @IsString()
    url: string;
  
    @IsNotEmpty({"message": "no debe dejar este elemento vacio"})
    @IsString()
    enrutador: string;
  
    @IsNotEmpty({"message": "no debe dejar este elemento vacio"})
    @IsString()
    rol: string;
  
  }