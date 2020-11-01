import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import * as Mongoose from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";
import * as mongoosePaginate from "mongoose-paginate-v2";
import * as mongoose_delete from "mongoose-delete";
import { DateProcessService } from "src/Classes/classes.index";

// SCHMA DE EJEMPLO

@Schema()
class _test extends Document {
  @Prop({
    default: "otro",
  }) 
  otro: string;

  @Prop({
    default: "dato",
    required: false,
  })
  dato: string;
}
const _testSchema = SchemaFactory.createForClass(_test);
const _dateService = new DateProcessService();

@Schema()
export class Users extends Document {
  
  @Prop({
    required: true,
    default: null,
  })
  name: string;

  @Prop({
    required: true,
    default: null,
  })
  last_name: string;

  @Prop({
    required: true,
    default: null,
  })
  id_card: string;

  @Prop({
    required: true,
    default: null,
  })
  pais: string;

  @Prop({
    required: true,
    default: null,
  })
  estado: string;

  @Prop({
    required: true,
    default: null,
  })
  ciudad: string;

  @Prop({
    required: true,
    default: null,
  })
  dir_domicilio: string;

  @Prop({
    required: true,
    default: null,
  })
  nro_movil: string;

  @Prop({
    required: true,
    default: null,
  })
  nro_fijo: string;

  @Prop({
    required: true,
    default: null,
  })
  edad: number;

  @Prop({
    required: true,
    default: null,
  })
  photo: string;

  @Prop({
    default: 'ACTIVE',
  })
  status: string;
  
  @Prop({
    required: true,
    unique: true
  })
  email: string;

  @Prop({
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Roles",
    required: [true, "Debe establecer un rol"],
  })
  rol: string;

  @Prop({required: true})
  pass: string;

  @Prop({
    type:   Array,
    required: true,
    default: _dateService.setDate(),
  })
  createdAt: string;

  @Prop({
    type: Array,
    default: null,
  })
  updatedAt: string;

  @Prop({
    type: Array,
    required: true,
    default: _dateService.setDate(),
  })
  last_session: string;

  @Prop({
    default: null,
  })
  enrutator_id: string;

  @Prop({ type: [_testSchema] })
  _test: _test;
}

export const UsersSchema = SchemaFactory.createForClass(Users)
  .plugin(uniqueValidator, {
    message: "El {PATH} {VALUE} ya está registrado en sistema",
  })
  .plugin(mongoosePaginate)
  .plugin(mongoose_delete, { overrideMethods: 'all' });
