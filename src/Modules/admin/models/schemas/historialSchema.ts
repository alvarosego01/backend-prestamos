import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



import * as Mongoose from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";
import * as mongoosePaginate from "mongoose-paginate-v2";
import * as mongoose_delete from "mongoose-delete";

import { DateProcessService } from "src/Classes/classes.index";
import { ActionAdmin, ActionDescp } from "../actionTypes.enum";

const actionEnum = Object.values(ActionAdmin);
const action =
{
    values  : actionEnum,
    message : 'Esta acción no esta permitida'
};

const actionDescp = Object.values(ActionDescp);
const descp =
{
    values  : actionDescp,
    message : 'Esta acción no esta permitida'
};

const _dateService = new DateProcessService();

@Schema()
export class Admin extends Document
{
    @Prop({
        type: String,
        required: true,
        default: 'CHANGE_ROLE',
        enum: actionEnum,
    })
    status: string;

    @Prop({
        type        :Mongoose.Schema.Types.ObjectId,
        ref         :"Users",
        required    :true 
    })
    usuario: string;

    @Prop({
        type        :Mongoose.Schema.Types.ObjectId,
        ref         :"Users",
        required    :true  
    })
    admin: string;

    @Prop({
        type: String,
        required: true,
        default: 'SET_LICENSE',
        enum: actionDescp
    })
    descripcion: string;

    @Prop({
        type: Array,
        default: _dateService.setDate()
    })
    createdAt: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin)
.plugin(uniqueValidator, {message: "Acción inválida"})
.plugin(mongoosePaginate)
.plugin(mongoose_delete, {overrideMethods: 'all'});