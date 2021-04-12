import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import * as Mongoose from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";
import * as castAggregation  from "mongoose-cast-aggregation";
import * as mongoosePaginate from "mongoose-paginate-v2";
import * as aggregatePaginate from "mongoose-aggregate-paginate-v2";
import * as mongoose_delete from "mongoose-delete";

import { DateProcessService } from "src/Classes/classes.index";


const _dateService = new DateProcessService();

@Schema()
export class TablaDiaria extends Document
{

    @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'Debe instanciar al enrutador quien creó la nueva ruta']
    })
    enrutador_id: string

    @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Negocio',
        required: false
    })
    negocios_id: string

    @Prop({
        type: Array,
        required: false,
        default: _dateService.setDate()
    })
    createdAt: string
}

export const TablaDiariaSchema = SchemaFactory.createForClass(TablaDiaria)
.plugin(uniqueValidator, 
{
  message: "El {PATH} {VALUE} ya está registrado en sistema",
})
.plugin(mongoosePaginate)
.plugin(aggregatePaginate)
.plugin(castAggregation)
.plugin(mongoose_delete, { overrideMethods: 'all' })