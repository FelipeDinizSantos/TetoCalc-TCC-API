import { Property } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

class CalculatePricingService {
    public execute(property: Property, properties: Property[]): number {
        let totalValuePerSquareMeter = 0;

        properties.forEach(prop => {
            totalValuePerSquareMeter += (prop.valuePerSquareMeter as Decimal).toNumber();
        });

        const averageValuePerSquareMeter = totalValuePerSquareMeter / properties.length;
        const valueProjection = property.usefulArea * averageValuePerSquareMeter;
        
        return valueProjection;
    }
}

export { CalculatePricingService };
