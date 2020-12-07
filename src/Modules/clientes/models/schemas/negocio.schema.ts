import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import * as Mongoose from "mongoose"; 
import * as uniqueValidator from "mongoose-unique-validator";
import * as mongoosePaginate from "mongoose-paginate-v2";
import * as mongoose_delete from "mongoose-delete";

import { DateProcessService } from "src/Classes/classes.index";

const _dateService = new DateProcessService();

@Schema()
export class Cuota extends Document 
{
    @Prop({
        type: Number,
        required: [true, 'Debe proporcionar el monto pagado']
    })
    pagado:Number;

    @Prop({
        type: Number,
        required: [true, 'Debe proporcionar el monto pagado']
    })
    restante:Number;

    @Prop({
        type: Number,
        default: 0
    })
    penalizacion:Number;

    @Prop({
        type: Number,
        required: [true, 'Debe proporcionar el monto pagado']
    })
    cuotas_restante:Number;
}
export const CuotaSchema = SchemaFactory.createForClass(Cuota);

@Schema()
export class Negocio extends Document 
{
    /*
    @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        refer: "Clinte",
        required: [true, "Debe incluir el cliente"]
    })
    cliente_id:string;
   
    @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'Debe incluir el cobrador encargado']
    })
    cobrador_id:string;
    */

    @Prop({
        type: Number,
        required: [true, "Requiere el monto de crédito"]
    })
    venta:number;

    @Prop({
        type: Number,
        required: [true, "Debe establecer la tasa de interés"]
    })
    interes:number;

    @Prop({
        type: Number,
        required: [true, "Debe establecer el número de cuotas"]
    })
    ncuotas:number;

    @Prop({
        type: Number,
        default: 0    
    })
    vcuotas:number;

    @Prop({
        type: Number,
        default: 0
    })
    total:number;

    @Prop({
        type: Boolean,
        default: true
    })
    pendiente:boolean;

    @Prop({
        type: [Mongoose.Schema.Types.ObjectId],
        default: null,
        ref: "Cuota"
    })
    cuotas:Array<Cuota>;

    @Prop({
        type: Array,
        default: _dateService.setDate()
    })
    createdAt: string;

    @Prop({
        type: Array,
        default: null
    })
    updatedAt: string[];
    
}
export const NegocioSchema = SchemaFactory.createForClass(Negocio)
.plugin(uniqueValidator, {
  message: "El {PATH} {VALUE} ya está registrado en sistema",
})
.plugin(mongoosePaginate)
.plugin(mongoose_delete, { overrideMethods: 'all' });