import { NegotiationRole, TypeRole } from "@prisma/client";

export interface GetAveragePriceOfNeighborhood{
    neighborhoodId: string;
    propertyNegotiation: NegotiationRole;
    propertyType: TypeRole;
}
