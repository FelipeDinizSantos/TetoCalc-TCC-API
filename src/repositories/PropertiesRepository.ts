import { Property } from "@prisma/client";
import { FindSimilarOnesDTO } from "../dtos/FindSimilarOnesDTO";
import { prisma } from "../prisma/client";
import { getTolerableAreaValue } from "../utils/getTolerableAreaValue";
import { pricing } from "../configs/pricing";

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
                    gte: bathrooms - pricing.tolerablePropsValue,
                    lte: bathrooms + pricing.tolerablePropsValue,
                },
                dormitories:{
                    gte: dormitories - pricing.tolerablePropsValue,
                    lte: dormitories + pricing.tolerablePropsValue,
                },
                suites:{
                    gte: suites ? suites - pricing.tolerablePropsValue: suites,
                    lte: suites ? suites + pricing.tolerablePropsValue: suites,
                },
                parkingSpaces:{
                    gte: parkingSpaces ? parkingSpaces - pricing.tolerablePropsValue : parkingSpaces,
                    lte: parkingSpaces ? parkingSpaces + pricing.tolerablePropsValue : parkingSpaces, 
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
