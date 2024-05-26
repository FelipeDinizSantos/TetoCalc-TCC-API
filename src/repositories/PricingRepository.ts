import { Propertie } from "@prisma/client";
import { FindSimilarOnesDTO } from "../dtos/FindSimilarOnesDTO";
import { prisma } from "../prisma/client";

class PricingRepository{
    public async findSimilarOnes({negotiation, neighborhoodId, type, typeStructure}:FindSimilarOnesDTO):Promise<Propertie[]>{
        return await prisma.propertie.findMany({
            where:{
                negotiation,
                type,
                neighborhoodId,
                typeStructure,
            },
            orderBy:{
                valuePerSquareMeter: "desc"
            }
        }) 
    }
}

export { PricingRepository };