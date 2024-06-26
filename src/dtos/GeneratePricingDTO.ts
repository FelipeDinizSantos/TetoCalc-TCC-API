import { StatusRole, TypeRole, TypeStructureRole, NegotiationRole } from "@prisma/client"

export interface GeneratePricingDTO{
    status: StatusRole; 
    type: TypeRole;
    typeStructure: TypeStructureRole;
    negotiation: NegotiationRole;
    dormitories: number;
    suites?: number;
    bathrooms: number;
    parkingSpaces?: number;
    usefulArea: number;
    buildingArea?: number;
    landArea?: number; 
    neighborhoodId: string;
}