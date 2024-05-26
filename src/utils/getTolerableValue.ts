export const getTolerableValue = (exactValue:number|undefined)=>{
    if(typeof exactValue === undefined) return exactValue;

    let tolerableValue;

    if(exactValue as number < 60) tolerableValue = 20; 
    if(exactValue as number > 60 && exactValue as number < 1000) tolerableValue = 100;
    if(exactValue as number > 1000) tolerableValue = 500;

    return tolerableValue;
}