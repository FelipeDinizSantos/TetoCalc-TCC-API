import { Property } from "@prisma/client";
import { FindSimilarOnesDTO } from "../dtos/FindSimilarOnesDTO";
import { prisma } from "../prisma/client";
import { getTolerableValue } from "../utils/getTolerableValue";

class PricingRepository{
    public async findSimilarOnes({
        negotiation, 
        neighborhoodId, 
        type, 
        typeStructure,
        bathrooms,
        buildingArea,
        dormitories,
        landArea,
        parkingSpaces,
        suites,
        totalArea,
        usefulArea
    }:FindSimilarOnesDTO):Promise<Property[]>{
        const totalPropertiesAccepted = 5;

        const properties = await prisma.property.findMany({
            where:{
                negotiation,
                type,
                neighborhoodId,
                typeStructure,
                bathrooms,
                buildingArea,
                dormitories,
                landArea,
                parkingSpaces,
                suites,
                totalArea,
                usefulArea
            },
            orderBy:{
                valuePerSquareMeter: "desc"
            },
            take: totalPropertiesAccepted
        }); 

        if(properties.length === totalPropertiesAccepted){
            return properties
        }

        const additionalProperty = await prisma.property.findMany({
            where:{
                negotiation,
                type,
                neighborhoodId,
                typeStructure,

                bathrooms:{
                    gte: bathrooms-1,
                    lte: bathrooms+1,
                },
                dormitories:{
                    gte: dormitories-1,
                    lte: dormitories+1,
                },
                suites:{
                    gte: suites?suites-1:suites,
                    lte: suites?suites+1:suites,
                },
                parkingSpaces:{
                    gte: parkingSpaces?parkingSpaces-1:parkingSpaces,
                    lte: parkingSpaces?parkingSpaces+1:parkingSpaces,
                },
                
                buildingArea:{
                    gte: getTolerableValue(buildingArea),
                    lte: getTolerableValue(buildingArea),
                },
                landArea:{
                    gte: getTolerableValue(landArea),
                    lte: getTolerableValue(landArea),
                },
                totalArea:{
                    gte: getTolerableValue(totalArea),
                    lte: getTolerableValue(totalArea),
                },
                usefulArea:{
                    gte: getTolerableValue(usefulArea),
                    lte: getTolerableValue(usefulArea),
                },

                NOT:{
                    id:{
                        in: properties.map(property => property.id)
                    }
                }
            },
            orderBy:{
                valuePerSquareMeter: "desc"
            },
            take: totalPropertiesAccepted - properties.length 
        })

        return [...properties, ...additionalProperty]
    }
}

export { PricingRepository };