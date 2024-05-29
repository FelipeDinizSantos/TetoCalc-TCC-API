import { NegotiationRole, TypeRole, TypeStructureRole } from "@prisma/client";

export interface FindSimilarOnesDTO{
    negotiation: NegotiationRole;
    typeStructure: TypeStructureRole;
    type: TypeRole;
    neighborhoodId: string;
    dormitories: number;
    suites?: number;
    bathrooms: number;
    parkingSpaces?: number;
    usefulArea: number;
    buildingArea?: number;
    landArea?: number;
}