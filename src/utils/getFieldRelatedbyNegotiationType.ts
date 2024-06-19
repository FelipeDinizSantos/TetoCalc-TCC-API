import { GetFieldRelatedByNegotiationTypeDTO } from "../dtos/GetFieldRelatedByNegotiationTypeDTO";

export function getFieldRelatedByNegotiationType({
    propertyNegotiation, 
    propertyType
}: GetFieldRelatedByNegotiationTypeDTO){
    if(propertyNegotiation === 'LOCACAO'){
        switch(propertyType){
            case 'APARTAMENTO':
                return 'averageSquareMeterForApartmentsLocation';

            case 'CASA_TERREA':
                return 'averageSquareMeterForOneStoryHouseLocation';

            case 'CASA_PADRAO':
                
            case 'SOBRADO':
                return 'averageSquareMeterForTownhousesLocation';
        }
    }else{
        switch(propertyType){
            case 'APARTAMENTO':
                return 'averageSquareMeterForApartmentsSale';

            case 'CASA_TERREA':
                return 'averageSquareMeterForOneStoryHouseSale';

            case 'CASA_PADRAO':

            case 'SOBRADO':
                return 'averageSquareMeterForTownhousesSale';
        }
    }
}