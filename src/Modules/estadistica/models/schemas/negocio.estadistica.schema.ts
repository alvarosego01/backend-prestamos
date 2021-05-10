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
  })//menor prestamo
  prestamo_low: number

  @Prop({
    type: Number,
    required: true
  })//myor prestamo
  prestamo_high: number

  @Prop({
    type: Number,
    required: true
  })//cantidad prestamo
  prestamo_count: number

  @Prop({
    type: Number,
    required: true
  })//total prestamos
  prestamo_total: number

  @Prop({
    type: Number,
    required: true
  })//cliente con el menor prestamo
  pclient_low: number

  @Prop({
    type: Number,
    required: true
  })//cliente con el mayor prestamo
  pclient_high: number

  @Prop({
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