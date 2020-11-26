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
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'Debe instanciar al cobrador asignado a este cliente']
    })
    cobrador_id: string;

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


    @Prop({
        type: String,
        required: [true, 'Debe instanciar la dirección del cliente']
    })
    dir_domicilio: string;

    @Prop({
        type: Number,
        required: [true, 'Debe instanciar la edad del cliente']
    })
    edad: number;

    @Prop({
        type: Number,
        required: [true, 'Debe instanciar porcentaje de las cuotas de pago del cliente']
    })
    perce_pagos: number;


    @Prop({
        type: Number,
        required: [true, 'Debe instanciar el monto prestado del cliente']
    })
    prestado: number;


    @Prop({
        type: concurrencia,
        required: [true]
    })
    concurrencia: concurrencia;

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