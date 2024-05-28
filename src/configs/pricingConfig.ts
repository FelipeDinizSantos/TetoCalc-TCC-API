export const pricingConfig = {
    maxPropertiesAccepted: 5,
    minPropertiesAccepted: 3,

    tolerablePropsValue: 1,

    tolerableValueIndexForAreas:{
        'building':{
            index: 0.20
        },
        'land':{
            index: 0.30
        },
        'total':{
            index: 0.20,
        },
        'useful':{
            index: 0.20,
        }
    },

    precisionLevel:{
        'high':{
            nivel: '1',
            description: 'Alto nível de precisão!'
        },
        'medium':{
            nivel: '2',
            description: 'Nível de precisão médio!'
        },
        'low':{
            nivel: '3', 
            description: 'Baixo nível de precisão!'
        },
        'insufficientData':{
            nivel: '4',
            description: 'Dados insuficientes para precificação!'
        }
    },
}
