import { MongooseModule } from "@nestjs/mongoose"
import { Cliente, ClienteSchema } from "./cliente.schema"
import { Cobros, CobrosSchema } from "./cobros.schema"

export const _CLIENTESCHEMA = MongooseModule.forFeature([
    {
        name: Cliente.name,
        schema: ClienteSchema
    }
]);

export const _COBROSCHEMA = MongooseModule.forFeature([
    {
        name: Cobros.name,
        schema: CobrosSchema
    }
]);