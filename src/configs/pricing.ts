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
        useful:{
            index: 0.60,
        }
    },

    areaWeights:{
        residential:{
            house:{
                buildArea: 0.3,
                landArea: 0.2,
                usefulArea: 0.5,
            },
            apartament:{
                buildArea: 0.2,
                landArea: 0.1,
                usefulArea: 0.7,
            }
        },
        commercial:
        {
            house:{
                buildArea: 0.3,
                landArea: 0.3,
                usefulArea: 0.4,
            },
            apartament:{
                buildArea: 0.3,
                landArea: 0.1,
                usefulArea: 0.6,
            }
        }
    }
}
