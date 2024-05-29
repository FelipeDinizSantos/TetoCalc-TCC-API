import { validate } from "../middlewares/validationMiddleware";
import { query } from "express-validator";

const status = [
    "VENDIDO",
    "LOCADO",
    "SUSPENSO",
    "ATIVO",
];

const types = [
    "SOBRADO",
    "APARTAMENTO",
    "CASA_TERREA",
    "CASA_PADRAO",
]

const typeStructures =[
    "COMERCIAL",
    "RESIDENCIAL",
]

const negotiations =[
    "VENDA",
    "LOCACAO",
]

export default validate([
    query('status').isString().toUpperCase().isIn(status).withMessage(`Status deve ser uma string e um dos seguintes: ${status.join(', ')}`),
    query('type').isString().toUpperCase().isIn(types).withMessage(`Type deve ser uma string e um dos seguintes: ${types.join(', ')}`),
    query('typeStructure').isString().toUpperCase().isIn(typeStructures).withMessage(`TypeStructure deve ser uma string e um dos seguintes: ${typeStructures.join(', ')}`),
    query('negotiation').isString().toUpperCase().isIn(negotiations).withMessage(`Negotiation deve ser uma string e um dos seguintes: ${negotiations.join(', ')}`),
    query('dormitories').isInt({min:0}).withMessage('Dormitories devem ser um inteiro maior que 0'),
    query('suites').isInt({min:0}).optional().withMessage('Suites devem ser um inteiro maior que 0'),
    query('bathrooms').isInt({min:0}).withMessage('Bathrooms devem ser um inteiro maior que 0'),
    query('parkingSpaces').isInt({min:0}).optional().withMessage('ParkingSpaces devem ser um inteiro maior que 10'),
    query('usefulArea').isFloat({min:10}).optional().withMessage('UsefulArea deve ser um número decimal maior que 10'),
    query('buildingArea').isFloat({min:10}).optional().withMessage('BuildingArea construída deve ser um número decimal maior que 10'),
    query('landArea').isFloat({min:10}).optional().withMessage('LandArea deve ser um número decimal maior que 10'),
    query('neighborhoodId').isString().isUUID().withMessage('NeighborhoodId deve ser uma string e um UUID válido'),
])
