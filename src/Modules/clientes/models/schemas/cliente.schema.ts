import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import * as Mongoose from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";
import * as mongoosePaginate from "mongoose-paginate-v2";
import * as mongoose_delete from "mongoose-delete";

import { DateProcessService } from "src/Classes/classes.index";

const _dateService = new DateProcessService();


export class concurrencia extends Document
{

    @Prop({
        type: String,
        required: [true]
    })
    tipo: string;

    @Prop({
        type: Number,
        required: [true, 'Debe instanciar el nro de pagos del cliente']
    })
    concurrencia: number;

}


@Schema()
export class Cliente extends Document
{
    @Prop({
        type: String,
        required: [true, 'Debe instanciar la identificación del cliente']
    })
    card_id: string;

    @Prop({
        type: String,
        required: [true, 'Debe instanciar el nombre del cliente']
    })
    name: string;

    @Prop({
        type: String,
        required: [true, 'Debe instanciar el apellido del cliente']
    })
    last_name: string;

    /* @Prop({
        type: String,
        required: [true, 'Debe instanciar la dirección del cliente']
    })
    dir_domicilio: string; */

    @Prop({
        type: Number,
        required: [true, 'Debe instanciar la edad del cliente']
    })
    edad: number;

    @Prop({
        type: Array,
        required: [true, "Debe incluir al menos un numero telefónico"]
    })
    phone:string;

    @Prop({
        type: String,
        required: [false]
    })
    photo:string;

    @Prop({
        type: String,
        required: [true, "Debe indicar el nivel de usuario"]
    })
    mail:string;

    @Prop({
        type: Array,
        required: [true, "Debe indicar el nivel de usuario"]
    })
    semáforo:string;

    @Prop({
        type: Array,
        required: false
    })
    geo:string;

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

export const ClienteSchema = SchemaFactory.createForClass(Cliente)
.plugin(uniqueValidator, {
  message: "El {PATH} {VALUE} ya está registrado en sistema",
})
.plugin(mongoosePaginate)
.plugin(mongoose_delete, { overrideMethods: 'all' });