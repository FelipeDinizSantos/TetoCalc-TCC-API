import { Property } from "@prisma/client";
import { GeneratePricingDTO } from "../dtos/GeneratePricingDTO";
import { PricingRepository } from "../repositories/PricingRepository";

class GeneratePricingService{
    private pricingRepository: PricingRepository;

    constructor(){
        this.pricingRepository = new PricingRepository();
    }

    public async execute(property:GeneratePricingDTO): Promise<Property[]|Object>{
        return await this.pricingRepository.findSimilarOnes(property)
    }
}

export { GeneratePricingService };