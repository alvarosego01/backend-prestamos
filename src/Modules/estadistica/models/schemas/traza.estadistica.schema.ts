import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


import * as Mongoose from "mongoose"
import * as uniqueValidator from "mongoose-unique-validator"
import * as castAggregation  from "mongoose-cast-aggregation"
import * as mongoosePaginate from "mongoose-paginate-v2"
import * as aggregatePaginate from "mongoose-aggregate-paginate-v2"
import * as mongoose_delete from "mongoose-delete"

import { DateProcessService } from "src/Classes/classes.index"

const _dateService = new DateProcessService()

@Schema()//schema que almacenará en base la cantidad de rutas por dia y a que enrutador le pertenece
export class TrazaEstadisticaSystema extends Document
{

  @Prop({
    type: Number,
    required: true
  })//numero total de  de rutas que maneja el sistema
  rutas: number

  @Prop({
    type: Number,
    required: true
  })//numero total de negocios que maneja el sistema
  neogcio: number

  @Prop({
    type: Number,
    required: true
  })//numero total de enrutadores que maneja el sistema
  enrutador: number

  @Prop({
    type: Number,
    required: true
  })//numero total de clientes que maneja el sistema
  cliente: number

  @Prop({
    type: Number,
    required: true
  })//numero total de cobradores que maneja el sistema
  cobrador: number

  @Prop({
    type: Number,
    required: true
  })//numero total de usuarios que maneja el sistema
  usuario: number

  @Prop({
    type: Number,
    required: true
  })//numero total de cobros que maneja el sistema
  cobro: number

  @Prop({
    type: Number,
    required: true
  })//numero total de nominas que maneja el sistema
  nomina: number

  @Prop({
    type: Number,
    required: true
  })//numero total de caja chicas que maneja el sistema
  caja_ch: number

  @Prop({
    required: false,
    type: Array,
    default: _dateService.setDate()
  })
  createdAt: string;

}

export const TrazaEstadisticaSystemaSchema = SchemaFactory.createForClass(TrazaEstadisticaSystema)
.plugin(uniqueValidator, {message: "Acción de ${PATH} inválida, ${VALUE}"})
.plugin(mongoosePaginate)
.plugin(aggregatePaginate)
.plugin(castAggregation)
.plugin(mongoose_delete, {overrideMethods: 'all'});