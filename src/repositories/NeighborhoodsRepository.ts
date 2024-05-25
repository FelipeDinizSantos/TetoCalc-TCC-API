import { prisma } from "../prisma/client"

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
}   

export {NeighborhoodsRepository}