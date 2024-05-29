export const pricing = {
    maxPropertiesAccepted: 5,
    minPropertiesAccepted: 3,

    precisionLevel:{
        high:{
            nivel: '1',
            description: 'Alto nível de precisão!'
        },
        medium:{
            nivel: '2',
            description: 'Nível de precisão médio!'
        },
        low:{
            nivel: '3', 
            description: 'Baixo nível de precisão!'
        },
        insufficientData:{
            nivel: '4',
            description: 'Dados insuficientes para precificação!'
        }
    },
    
    tolerablePropsValue: 1,

    tolerableValueIndexForAreas:{
        building:{
            index: 0.20
        },
        land:{
            index: 0.30
        },
        total:{
            index: 0.20,
        },
        useful:{
            index: 0.20,
        }
    },

    areaWeights:{
        residential:{
            house:{
                totalArea: 0.2,
                buildArea: 0.2,
                landArea: 0.1,
                usefulArea: 0.5,
            },
            apartament:{
                totalArea: 0.1,
                buildArea: 0.1,
                landArea: 0.1,
                usefulArea: 0.7,
            }
        },
        commercial:
        {
            house:{
                totalArea: 0.1,
                buildArea: 0.5,
                landArea: 0.1,
                usefulArea: 0.3,
            },
            apartament:{
                totalArea: 0.1,
                buildArea: 0.4,
                landArea: 0.1,
                usefulArea: 0.4,
            }
        }
    }
}
