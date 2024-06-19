import { GeneratePricingDTO } from "../../dtos/GeneratePricingDTO";
import { PropertiesRepository } from "../../repositories/PropertiesRepository";
import { pricing } from "../../configs/pricing";
import { CalculatePricingService } from "./CalculatePricingService";
import { Property } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

class GeneratePricingService{
    private propertiesRepository: PropertiesRepository;
    private calculatePricingService: CalculatePricingService;

    constructor(){
        this.propertiesRepository = new PropertiesRepository();
        this.calculatePricingService = new CalculatePricingService();
    }

    public async execute(property:GeneratePricingDTO){
        const properties = await this.propertiesRepository.findSimilarOnes(property, pricing.maxPropertiesAccepted);
        let valueProjection;

        if (properties.length === 0) {
            const { neighborhoodId, negotiation, type } = property;
        
            let valueProjection = await this.propertiesRepository.getAveragePriceOfNeighborhood({
                neighborhoodId,
                propertyNegotiation: negotiation,
                propertyType: type,
            });
        
            return {
                LevelOfPricingAccuracy: pricing.precisionLevel['insufficientData'],
                valueProjection,
            };
        }

        valueProjection = this.calculatePricingService.execute(property as unknown as Property, properties);

        if(properties.length < pricing.minPropertiesAccepted){
            return{
                LevelOfPricingAccuracy: pricing.precisionLevel['low'],
                targetProperty: property,
                propertiesUsedInProjection: properties,
                projectedValueOfTheProperty: valueProjection,
            }
        }
        if(properties.length === pricing.minPropertiesAccepted){
            return{
                LevelOfPricingAccuracy: pricing.precisionLevel['medium'],
                targetProperty: property,
                propertiesUsedInProjection: properties,
                projectedValueOfTheProperty: valueProjection,
            }
        }
        if(properties.length > pricing.minPropertiesAccepted && properties.length <= pricing.maxPropertiesAccepted){
            return{
                LevelOfPricingAccuracy: pricing.precisionLevel['high'],
                targetProperty: property,
                propertiesUsedInProjection: properties,
                projectedValueOfTheProperty: valueProjection,
            }
        }
    }
}

export { GeneratePricingService };
