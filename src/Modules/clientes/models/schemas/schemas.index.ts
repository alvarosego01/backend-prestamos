import { MongooseModule } from "@nestjs/mongoose"
import { Cliente, ClienteSchema } from "./cliente.schema"

export const _CLIENTESCHEMA = MongooseModule.forFeature([
    {
        name: Cliente.name,
        schema: ClienteSchema
    }
]);