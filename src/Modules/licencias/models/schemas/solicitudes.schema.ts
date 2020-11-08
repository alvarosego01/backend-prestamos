import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


import * as Mongoose from "mongoose"
import * as uniqueValidator from "mongoose-unique-validator";
import * as mongoosePaginate from "mongoose-paginate-v2";
import * as mongoose_delete from "mongoose-delete";

import { DateProcessService } from "src/Classes/classes.index";
import { STATUS } from "../enums/licencia.status.enum";

const _dateService = new DateProcessService();
let status = Object.values(STATUS);
const enumStatus =
{
    value: status,
    message: 'Estatus no permitido ${VALUE}'
}

@Schema()
export class LicenciaSolicitud extends Document
{

    @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        default: null,
        required: [true, "Debe establecer el codigo del usuario quien hace la solicitud"]
    })
    idUsuario:string

    @Prop({
        type: String,
        required: true,
        default: "PENDIENTE",
        enum: enumStatus
    })
    status:string

    @Prop({
        // required: true,
        type: Array,
        default: _dateService.setDate()
    })
    createdAt:string;

    @Prop({
        // required: true,
        type: Array,
        default: null
    })
    updatedAt:string;
}

export const LicenciaSolicitudSchema = SchemaFactory.createForClass(LicenciaSolicitud)
.plugin(uniqueValidator, {message: "Acción inválida, ${VALUE}"})
.plugin(mongoosePaginate)
.plugin(mongoose_delete, {overrideMethods: 'all'});