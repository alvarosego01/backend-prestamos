import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import * as Mongoose from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";
import * as mongoosePaginate from "mongoose-paginate-v2";
import * as mongoose_delete from "mongoose-delete";

import { DateProcessService } from "src/Classes/classes.index";


const _dateService = new DateProcessService();


// @Schema()
export class _files extends Document {

    @Prop({
      required: true,
      default: null,
    })
    type: string;
    @Prop({
      required: true,
      default: null,
    })
    file: string;
    @Prop({
      required: true,
      default: null,
    })
    format: string;
    @Prop({
      required: true,
      default: null,
    })
    folder: string;

  }


@Schema()
export class Ruta extends Document
{

    @Prop({
        type: _files,
        default: null,
      })
    photo: _files;

    @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'Debe instanciar al enrutador quien creó la nueva ruta']
    })
    enrutador_id: string;

    @Prop({
        type: [Mongoose.Schema.Types.ObjectId],
        ref: 'Cliente',
    })

    clientes_id: Array<any>;

    @Prop({
        type: Number,
        default: 0.00
    })
    maxRecaudado:number;

    @Prop({
        type: Number,
        default: 0.00
    })
    lastRecaudado:number;

    @Prop({
        type: String,
        required: [true, "Falta establecer un titulo de la ruta"],
        default: null
    })
    titleRoute:string;

    @Prop({
        type: String,
        required: [true, "Falta establecer la ciudad"],
        default: null
    })
    city:string;

    @Prop({
        type: String,
        required: [true, "Falta establecer el departamento"],
        default: null
    })
    department:string;

    @Prop({
        type: Array,
        default: _dateService.setDate()
    })
    createdAt: string;

    @Prop({
        type: Array,
        default: null
    })
    updatedAt: Array<string>;

}

export const RutaSchema = SchemaFactory.createForClass(Ruta)
.plugin(uniqueValidator, {
  message: "El {PATH} {VALUE} ya está registrado en sistema",
})
.plugin(mongoosePaginate)
.plugin(mongoose_delete, { overrideMethods: 'all' });



