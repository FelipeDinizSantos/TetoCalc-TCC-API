export const pricingConfig = {
    maxPropertiesAccepted: 5,
    minPropertiesAccepted: 3,

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
        '1':{
            nivel: '1',
            description: 'Alto nível de precisão!'
        },
        '2':{
            nivel: '2',
            description: 'Nível de precisão médio!'
        },
        '3':{
            nivel: '3', 
            description: 'Baixo nível de precisão!'
        },
        '4':{
            nivel: '4',
            description: 'Dados insuficientes para precificação!'
        }
    },
}
