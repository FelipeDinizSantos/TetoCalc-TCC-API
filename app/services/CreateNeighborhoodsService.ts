import { AppError } from "../errors/AppError";
import { NeighborhoodsRepository } from "../repositories/NeighborhoodsRepository";

interface ICreateNeighborhoods{
    neighborhoodRanking: number;
    name: string; 
    description: string;
    accessibilityRanking: number;
    valuePerSquareMeterSale: number;
    valuePerSquareMeterRental: number;
    additionalInformation?: string;
    cityId: string;
}

class CreateNeighborhoodsService{
    private neighborhoodsRepository;
    
    constructor(){
        this.neighborhoodsRepository = new NeighborhoodsRepository();
    }

    public async execute({neighborhoodRanking, name, description, accessibilityRanking, valuePerSquareMeterSale, valuePerSquareMeterRental, additionalInformation, cityId}:ICreateNeighborhoods){
        const neighborhoodExist = await this.neighborhoodsRepository.getOneByName(name);

        if(neighborhoodExist){
            throw new AppError('This neighborhood already exist!');
        }

        await this.neighborhoodsRepository.save({
            neighborhoodRanking,
            name,
            description,
            accessibilityRanking,
            valuePerSquareMeterRental,
            valuePerSquareMeterSale,
            additionalInformation,
            created_at: new Date(),
            cityId
        })
    }
}

export { CreateNeighborhoodsService };