import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import * as Mongoose from "mongoose"; 
import * as uniqueValidator from "mongoose-unique-validator";
import * as mongoosePaginate from "mongoose-paginate-v2";
import * as mongoose_delete from "mongoose-delete";

import { DateProcessService } from "src/Classes/classes.index";
import {statusCobro} from "../enum/status.cobro.enum";

const _dateService = new DateProcessService();

@Schema()
export class Cobros extends Document 
{ 
    /* @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'Debe instanciar el cobrador encargado de']
    })
    cobrador_id: string;
    
    @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: [true, 'Debe instanciar el cliente para el cobro']
    })
    cliente_id: string; */

    @Prop({
        type: String,
        default: "Sin Observaciones"
    })
    observacion: string;

    @Prop({
        type: Number,
        required: [true, 'Debe indicar el monto del pago']
    })
    monto: number;

    @Prop({
        type: String,
        required: [true, 'Debe establecer un estatus del cobro'],
        default: statusCobro.CREADO
    })
    status: string;

    @Prop({
        type: Array,
        default: _dateService.setDate()
    })
    createdAt: string;

    @Prop({
        type: Array,
        default: null
    })
    updatedAt: string;
}
export const CobrosSchema = SchemaFactory.createForClass(Cobros)
.plugin(uniqueValidator, {
  message: "El {PATH} {VALUE} ya está registrado en sistema",
})
.plugin(mongoosePaginate)
.plugin(mongoose_delete, { overrideMethods: 'all' });