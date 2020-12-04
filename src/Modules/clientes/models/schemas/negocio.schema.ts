import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import * as Mongoose from "mongoose"; 
import * as uniqueValidator from "mongoose-unique-validator";
import * as mongoosePaginate from "mongoose-paginate-v2";
import * as mongoose_delete from "mongoose-delete";

import { DateProcessService } from "src/Classes/classes.index";

@Schema()
export class Negocio extends Document 
{
    @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        refer: "Clinte",
        required: [true, "Debe incluir el cliente"]
    })
    cliente_id:string;
   
    @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'Debe incluir el cobrador encargado']
    })
    cobrador_id: string;

    


}
export const NegocioSchema = SchemaFactory.createForClass(Negocio)
.plugin(uniqueValidator, {
  message: "El {PATH} {VALUE} ya está registrado en sistema",
})
.plugin(mongoosePaginate)
.plugin(mongoose_delete, { overrideMethods: 'all' });