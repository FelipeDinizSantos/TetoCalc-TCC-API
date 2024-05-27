import { GeneratePricingDTO } from "../../dtos/GeneratePricingDTO";
import { PropertiesRepository } from "../../repositories/PropertiesRepository";
import { pricingConfig } from "../../config/pricingConfig";
import { CalculatePricingService } from "./CalculatePricingService";
import { Property } from "@prisma/client";

class GeneratePricingService{
    private propertiesRepository: PropertiesRepository;
    private calculatePricingService: CalculatePricingService;

    constructor(){
        this.propertiesRepository = new PropertiesRepository();
        this.calculatePricingService = new CalculatePricingService();
    }

    public async execute(property:GeneratePricingDTO){
        const properties = await this.propertiesRepository.findSimilarOnes(property, pricingConfig.maxPropertiesAccepted);
        const valueprojection = this.calculatePricingService.execute(property as unknown as Property, properties);

        if(properties.length === 0){
            return{
                precisionLevel: pricingConfig.precisionLevel['4'],
            }
        } 
        if(properties.length < pricingConfig.minPropertiesAccepted){
            return{
                precisionLevel: pricingConfig.precisionLevel['3'],
                valueprojection,
                properties
            }
        }
        if(properties.length === pricingConfig.minPropertiesAccepted){
            return{
                precisionLevel: pricingConfig.precisionLevel['2'],
                valueprojection,
                properties
            }
        }
        if(properties.length > pricingConfig.minPropertiesAccepted && properties.length <= pricingConfig.maxPropertiesAccepted){
            return{
                precisionLevel: pricingConfig.precisionLevel['1'],
                valueprojection,
                properties
            }
        }
    }
}

export { GeneratePricingService };