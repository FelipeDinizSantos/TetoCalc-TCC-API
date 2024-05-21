import { prisma } from "../prisma/client"

interface ICreate{
    neighborhoodRanking: number;
    name: string; 
    description: string;
    accessibilityRanking: number;
    valuePerSquareMeterSale: number;
    valuePerSquareMeterRental: number;
    additionalInformation?: string;
    createdAt: Date;
    cityId: string;
}

class NeighborhoodsRepository{
    public async getAll(){
        return await prisma.neighborhood.findMany({
            orderBy: {
                valuePerSquareMeterSale: "desc"
            },
            include:{
                city: {
                    select:{
                        name:true
                    }
                }
            }
        })
    }

    public async getOneByName(name:string){
        return await prisma.neighborhood.findFirst({
            where:{
                name
            }
        }) 
    }
    
    public async save({neighborhoodRanking, name, description, accessibilityRanking, valuePerSquareMeterSale, valuePerSquareMeterRental, additionalInformation, createdAt, cityId}:ICreate){
        await prisma.neighborhood.create({
            data:{
                neighborhoodRanking,
                name,
                description,
                accessibilityRanking,
                valuePerSquareMeterSale,
                valuePerSquareMeterRental,
                additionalInformation,
                createdAt,
                cityId
            }
        })
    }
}   

export {NeighborhoodsRepository}