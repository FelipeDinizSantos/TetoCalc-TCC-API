import { Property } from "@prisma/client";
import { FindSimilarOnesDTO } from "../dtos/FindSimilarOnesDTO";
import { prisma } from "../prisma/client";
import { getTolerableAreaValue } from "../utils/getTolerableAreaValue";

class PropertiesRepository{
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
    }:FindSimilarOnesDTO, maxPropertiesAccepted:number):Promise<Property[]>{
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
            take: maxPropertiesAccepted
        }); 

        if(properties.length === maxPropertiesAccepted){
            return properties
        }

        const additionalProperty = await prisma.property.findMany({
            where:{
                negotiation,
                type,
                neighborhoodId,
                typeStructure,

                bathrooms:{
                    gte: bathrooms - 1,
                    lte: bathrooms + 1,
                },
                dormitories:{
                    gte: dormitories - 1,
                    lte: dormitories + 1,
                },
                suites:{
                    gte: suites ? suites - 1: suites,
                    lte: suites ? suites + 1: suites,
                },
                parkingSpaces:{
                    gte: parkingSpaces ? parkingSpaces - 1 : parkingSpaces,
                    lte: parkingSpaces ? parkingSpaces + 1 : parkingSpaces, 
                },
                buildingArea:{
                    gte: getTolerableAreaValue(buildingArea, "building", 'min'),
                    lte: getTolerableAreaValue(buildingArea, "building", 'max'),
                },
                landArea:{
                    gte: getTolerableAreaValue(landArea, "land", 'min'),
                    lte: getTolerableAreaValue(landArea, "land", 'max'),
                },
                totalArea:{
                    gte: getTolerableAreaValue(totalArea, "total", 'min'),
                    lte: getTolerableAreaValue(totalArea, "total", 'max'),
                },
                usefulArea:{
                    gte: getTolerableAreaValue(usefulArea, "useful", 'min'),
                    lte: getTolerableAreaValue(usefulArea, "useful", 'max'),
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
            take: maxPropertiesAccepted - properties.length 
        })

        
        return [...properties, ...additionalProperty]
    }
}

export { PropertiesRepository };
