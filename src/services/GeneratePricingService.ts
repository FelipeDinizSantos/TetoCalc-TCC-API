import { Propertie } from "@prisma/client";
import { GeneratePricingDTO } from "../dtos/GeneratePricingDTO";
import { PricingRepository } from "../repositories/PricingRepository";

class GeneratePricingService{
    private pricingRepository: PricingRepository;

    constructor(){
        this.pricingRepository = new PricingRepository();
    }

    public async execute(propertie:GeneratePricingDTO): Promise<Propertie[]>{
        return await this.pricingRepository.findSimilarOnes(propertie)
    }
}

export { GeneratePricingService };