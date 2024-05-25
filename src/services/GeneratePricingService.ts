import { GeneratePricingDTO } from "../dtos/GeneratePricingDTO";

class GeneratePricingService{
    public async execute(propertie:GeneratePricingDTO){
        return propertie;
    }
}

export {GeneratePricingService};