export { AdminSchema } from "./schemas/adminSchema";
export { License } from "./schemas/licenseSchema";

import { AdminSchema, Admin } from "./schemas/adminSchema";
import { License, LicenseSchema } from "./schemas/licenseSchema";
import { MongooseModule } from "@nestjs/mongoose";

export const _LICENSESCHEMA = MongooseModule.forFeature([
    {
        name: License.name,
        schema: LicenseSchema,
    },
]);

export const _ADMINSCHEMA = MongooseModule.forFeature([
    {
        name: Admin.name,
        schema: AdminSchema,
    },
]);