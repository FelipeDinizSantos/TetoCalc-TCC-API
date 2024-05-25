import { Response, Request } from "express";

import { StatusRole, TypeRole, TypeStructureRole, NegotiationRole } from "@prisma/client"
import { GeneratePricingService } from "../services/GeneratePricingService";
import { GeneratePricingDTO } from "../dtos/GeneratePricingDTO";

const generatePricingService = new GeneratePricingService();

class PricingController{
    public async generate({query}: Request, res:Response){
        const data: GeneratePricingDTO = {
            status: query.status as StatusRole,
            type: query.type as TypeRole,
            typeStructure: query.typeStructure as TypeStructureRole,
            negotiation: query.negotiation as NegotiationRole,
            valuePerSquareMeter: Number(query.valuePerSquareMeter),
            value: Number(query.value),
            dormitories: Number(query.dormitories),
            suites: query.suites ? Number(query.suites) : undefined,
            bathrooms: Number(query.bathrooms),
            parkingSpaces: query.parkingSpaces ? Number(query.parkingSpaces) : undefined,
            totalArea: query.totalArea ? Number(query.totalArea) : undefined,
            usefulArea: Number(query.usefulArea),
            buildingArea: query.buildingArea ? Number(query.buildingArea) : undefined,
            landArea: query.landArea ? Number(query.landArea) : undefined,
            neighborhoodId: query.neighborhoodId as string, 
        }

        const propertie = await generatePricingService.execute(data);
        res.status(200).json({propertie});
    }
}

export {PricingController};