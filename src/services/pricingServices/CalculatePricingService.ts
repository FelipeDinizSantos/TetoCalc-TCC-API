import { Property } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { pricing } from "../../configs/pricing";

class CalculatePricingService {
    public execute(property: Property, properties: Property[]): number {

        let totalValuePerBuiltSquareMeter = 0;
        let totalValuePerLandSquareMeter = 0;
        let totalValuePerUsefulSquareMeter = 0;
        let totalValuePerTotalSquareMeter = 0;

        properties.forEach(prop => {
            const value = (prop.value as Decimal).toNumber();

            const propertyBuildArea = prop.buildingArea === null ? 0 : prop.buildingArea;
            const propertyLandArea = prop.landArea === null ? 0 : prop.landArea;
            const properyTotalArea = prop.totalArea === null ? 0 : prop.totalArea;

            totalValuePerUsefulSquareMeter += (value / prop.usefulArea)
            if(propertyBuildArea > 0) totalValuePerBuiltSquareMeter += (value / propertyBuildArea)
            if(propertyLandArea > 0) totalValuePerLandSquareMeter += (value / propertyLandArea)
            if(properyTotalArea > 0) totalValuePerTotalSquareMeter += (value / properyTotalArea)
        });

        const averageValuePerUsefulSquareMeter = totalValuePerUsefulSquareMeter / properties.length;
        const averageValuePerBuiltSquareMeter = totalValuePerBuiltSquareMeter / properties.length;
        const averageValuePerLandSquareMeter = totalValuePerLandSquareMeter / properties.length;
        const averageValuePerTotalSquareMeter = totalValuePerTotalSquareMeter / properties.length;

        let weights;

        switch(property.typeStructure){
            case 'RESIDENCIAL':
                if(property.type === 'APARTAMENTO') weights = pricing.areaWeights['residential']['apartament']
                else weights = pricing.areaWeights['residential']['house']

                break;
            case 'COMERCIAL':
                if(property.type === 'APARTAMENTO') weights = pricing.areaWeights['commercial']['apartament']
                else weights = pricing.areaWeights['commercial']['house']

                break;
        }

        const valueProjection = (property.usefulArea * averageValuePerUsefulSquareMeter * weights.usefulArea) +
        (property.totalArea === undefined || property.totalArea === null ? 0 : property.totalArea * averageValuePerTotalSquareMeter * weights.totalArea) + 
        (property.buildingArea === undefined || property.buildingArea === null ? 0 : property.buildingArea * averageValuePerBuiltSquareMeter * weights.buildArea) +
        (property.landArea === undefined || property.landArea === null ? 0 : property.landArea * averageValuePerLandSquareMeter * weights.landArea);

        return valueProjection;
    }
}

export { CalculatePricingService };
