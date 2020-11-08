import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


import * as Mongoose from "mongoose"
import * as uniqueValidator from "mongoose-unique-validator";
import * as mongoosePaginate from "mongoose-paginate-v2";
import * as mongoose_delete from "mongoose-delete";

import { DateProcessService } from "src/Classes/classes.index";

const _dateService = new DateProcessService();

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
        default: "Pendiente"
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