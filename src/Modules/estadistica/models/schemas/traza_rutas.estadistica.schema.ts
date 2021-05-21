import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


import * as Mongoose from "mongoose"
import * as uniqueValidator from "mongoose-unique-validator";
import * as castAggregation  from "mongoose-cast-aggregation";
import * as mongoosePaginate from "mongoose-paginate-v2";
import * as aggregatePaginate from "mongoose-aggregate-paginate-v2";
import * as mongoose_delete from "mongoose-delete";

import { DateProcessService } from "src/Classes/classes.index";

const _dateService = new DateProcessService();

@Schema()//schema que almacenará en base la cantidad de rutas por dia y a que enrutador le pertenece
export class TrazaRutas extends Document
{

  @Prop({
    type: Number,
    required: true,
    unique: true
  })//total de rutas que manejo un enrutador
  cantidad: number

  @Prop({
    type: Number,
    required: true,
    unique: true
  })//codigo id del enrutador
  enrutador: number

  @Prop({
    required: false,
    type: Array,
    default: _dateService.setDate()
  })
  createdAt: string;

}

export const TrazaRutasSchema = SchemaFactory.createForClass(TrazaRutas)
.plugin(uniqueValidator, {message: "Acción de ${PATH} inválida, ${VALUE}"})
.plugin(mongoosePaginate)
.plugin(aggregatePaginate)
.plugin(castAggregation)
.plugin(mongoose_delete, {overrideMethods: 'all'});