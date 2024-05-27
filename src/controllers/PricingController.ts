import { Response, Request } from "express";

import { StatusRole, TypeRole, TypeStructureRole, NegotiationRole } from "@prisma/client"
import { GeneratePricingService } from "../services/pricingServices/GeneratePricingService";
import { GeneratePricingDTO } from "../dtos/GeneratePricingDTO";

const generatePricingService = new GeneratePricingService();

class PricingController{
    public async generate(req: Request, res:Response){
        const {query} = req;
        const propertyData: GeneratePricingDTO = {
            status: query.status as StatusRole,
            type: query.type as TypeRole,
            typeStructure: query.typeStructure as TypeStructureRole,
            negotiation: query.negotiation as NegotiationRole,
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

        const result = await generatePricingService.execute(propertyData);
        res.status(200).json({
            data: result
        });
    }
}

export {PricingController};
