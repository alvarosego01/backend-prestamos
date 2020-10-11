import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Mongoose } from "mongoose";



import * as uniqueValidator from "mongoose-unique-validator";
import * as mongoosePaginate from "mongoose-paginate-v2";
import * as mongoose_delete from "mongoose-delete";

import { DateProcessService } from "src/Classes/classes.index";
import { StatusLicense } from "../actionTypes.enum";

const statusLicense = Object.values(StatusLicense);
const action =
{
    values  : statusLicense,
    message : 'Esta acción no esta permitida'
};
const _dateService = new DateProcessService();

@Schema()
export class License extends Document
{
    @Prop({
        type        :String,
        default     :null,
        required    :[true, 'Debe establecer un nombre de la linecia']
    })
    name: string;

    @Prop({
        type        :Array,
        required    :[true, 'Debe establecer una duracion de la licencia']
    })
    duracion: string;

    @Prop({
        type        :Mongoose.Schema.Types.ObjectId,
        ref         :"Users",
        required    : [true, "Debe indicar el usuario dueño de la licencia"] 
    })
    usuario: string;

    @Prop({
        type        :Mongoose.Schema.Types.ObjectId,
        ref         :"Users",
        required    : [true, "Debe indicar el administrador que cedió la licencia"] 
    })
    admin: string;

    @Prop({
        type        :Number,
        default     :0.00,
        required    :[true, "Debe establecer el costo de la licencia"]
    })
    precio: number;

    @Prop({
        type: String,
        required: true,
        default: 'ACTIVE',
        enum: statusLicense,
        unique: true,
    })
    status: string;

    @Prop({
        type: Array,
        default: _dateService.setDate()
    })
    createdAt: string;

    @Prop({
        type: Array,
        default: _dateService.setDate()
    })
    updatedAt: string;
}

export const LicenseSchema = SchemaFactory.createForClass(License)
.plugin(uniqueValidator, {message: "Acción inválida"})
.plugin(mongoosePaginate)
.plugin(mongoose_delete, {overrideMethods: 'all'});