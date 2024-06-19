import { NegotiationRole, TypeRole } from "@prisma/client";

export interface GetFieldRelatedByNegotiationTypeDTO{
    propertyNegotiation: NegotiationRole;
    propertyType: TypeRole;
}