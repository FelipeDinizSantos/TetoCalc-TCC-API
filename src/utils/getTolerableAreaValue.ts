import { pricingConfig } from "../configs/pricingConfig";

export function getTolerableAreaValue(
    value: number|undefined, 
    typeArea: 'building' | 'land' | 'total' | 'useful', 
    mode: 'min' | 'max'
): number|undefined{
    const percentageOfTolerableArea = value as number * pricingConfig.tolerableValueIndexForAreas[typeArea].index; 

    if(value){
        switch (mode) {
            case 'max':  
                value += percentageOfTolerableArea;
                break;
            case 'min':
                value -= percentageOfTolerableArea;
                break;
        }
        return value;
    }
    return value; 
}