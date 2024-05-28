import { GeneratePricingDTO } from "../../dtos/GeneratePricingDTO";
import { PropertiesRepository } from "../../repositories/PropertiesRepository";
import { pricingConfig } from "../../configs/pricingConfig";
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
        const valueProjection = this.calculatePricingService.execute(property as unknown as Property, properties);

        if(properties.length === 0){
            return{
                LevelOfPricingAccuracy: pricingConfig.precisionLevel['insufficientData'],
            }
        } 
        if(properties.length < pricingConfig.minPropertiesAccepted){
            return{
                LevelOfPricingAccuracy: pricingConfig.precisionLevel['low'],
                targetProperty: property,
                propertiesUsedInProjection: properties,
                projectedValueOfTheProperty: valueProjection,
            }
        }
        if(properties.length === pricingConfig.minPropertiesAccepted){
            return{
                LevelOfPricingAccuracy: pricingConfig.precisionLevel['medium'],
                targetProperty: property,
                propertiesUsedInProjection: properties,
                projectedValueOfTheProperty: valueProjection,
            }
        }
        if(properties.length > pricingConfig.minPropertiesAccepted && properties.length <= pricingConfig.maxPropertiesAccepted){
            return{
                LevelOfPricingAccuracy: pricingConfig.precisionLevel['high'],
                targetProperty: property,
                propertiesUsedInProjection: properties,
                projectedValueOfTheProperty: valueProjection,
            }
        }
    }
}

export { GeneratePricingService };
