import { MongooseModule } from "@nestjs/mongoose"
import { Cliente, ClienteSchema } from "./cliente.schema"



console.log('que es', Cliente.name);

export const _CLIENTESCHEMA = MongooseModule.forFeature([
    {
        name: Cliente.name,
        schema: ClienteSchema
    }
]);