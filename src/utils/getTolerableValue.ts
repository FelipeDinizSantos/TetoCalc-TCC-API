export function getTolerableValue(exactValue: number|undefined, mode: 'min' | 'max'): number|undefined{
    if(exactValue){
        switch (mode) {
            case 'max':
                if(exactValue <= 80) exactValue += 20;
                else if(exactValue > 80 && exactValue < 1000) exactValue += 100;
                else if(exactValue >= 1000) exactValue += 500;
            
                break;
            case 'min':
                if(exactValue <= 80) exactValue -= 20;
                else if(exactValue > 80 && exactValue < 1000) exactValue -= 100;
                else if(exactValue >= 1000) exactValue -= 500;
                
                break;
        }
        return exactValue;
    }
    return exactValue; 
}