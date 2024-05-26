import { NegotiationRole, TypeRole, TypeStructureRole } from "@prisma/client";

export interface FindSimilarOnesDTO{
    negotiation: NegotiationRole;
    typeStructure: TypeStructureRole;
    type: TypeRole;
    neighborhoodId: string;
}