import { Property } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { pricing } from "../../configs/pricing";

class CalculatePricingService {
    public execute(property: Property, properties: Property[]): number {

        let totalValuePerBuiltSquareMeter = 0;
        let totalValuePerLandSquareMeter = 0;
        let totalValuePerUsefulSquareMeter = 0;

        properties.forEach(prop => {
            const value = (prop.value as Decimal).toNumber();

            const propertyBuildArea = prop.buildingArea === null ? 0 : prop.buildingArea;
            const propertyLandArea = prop.landArea === null ? 0 : prop.landArea;

            totalValuePerUsefulSquareMeter += (value / prop.usefulArea);
            if (propertyBuildArea > 0) totalValuePerBuiltSquareMeter += (value / propertyBuildArea);
            if (propertyLandArea > 0) totalValuePerLandSquareMeter += (value / propertyLandArea);
        });

        const averageValuePerUsefulSquareMeter = totalValuePerUsefulSquareMeter / properties.length;
        const averageValuePerBuiltSquareMeter = totalValuePerBuiltSquareMeter / properties.length;
        const averageValuePerLandSquareMeter = totalValuePerLandSquareMeter / properties.length;

        let initialWeights;

        switch (property.typeStructure) {
            case 'RESIDENCIAL':
                if (property.type === 'APARTAMENTO') {
                    initialWeights = pricing.areaWeights['residential']['apartament'];
                } else {
                    initialWeights = pricing.areaWeights['residential']['house'];
                }
                break;
            case 'COMERCIAL':
                if (property.type === 'APARTAMENTO') {
                    initialWeights = pricing.areaWeights['commercial']['apartament'];
                } else {
                    initialWeights = pricing.areaWeights['commercial']['house'];
                }
                break;
        }

        type AreaKeys = keyof typeof initialWeights;
        const availableAreas: AreaKeys[] = [];
        if (property.landArea && property.landArea > 0) availableAreas.push('landArea');
        if (property.buildingArea && property.buildingArea > 0) availableAreas.push('buildArea');
        if (property.usefulArea && property.usefulArea > 0) availableAreas.push('usefulArea');

        const adjustedWeights: { [key in AreaKeys]: number } = {
            buildArea: 0,
            landArea: 0,
            usefulArea: 0
        };

        const weightSum = availableAreas.reduce((sum, area) => sum + initialWeights[area], 0);
        availableAreas.forEach(area => {
            adjustedWeights[area] = initialWeights[area] / weightSum;
        });

        const valueProjection = (property.usefulArea * averageValuePerUsefulSquareMeter * (adjustedWeights.usefulArea || 0)) + 
            ((property.buildingArea && property.buildingArea > 0) ? property.buildingArea * averageValuePerBuiltSquareMeter * (adjustedWeights.buildArea || 0) : 0) +
            ((property.landArea && property.landArea > 0) ? property.landArea * averageValuePerLandSquareMeter * (adjustedWeights.landArea || 0) : 0);

        return parseFloat(valueProjection.toFixed(2));
    }
}

export { CalculatePricingService };
