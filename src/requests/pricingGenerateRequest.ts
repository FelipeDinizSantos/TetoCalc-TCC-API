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
    "CONDOMINIO",
    "EDIFICIO",
    "RESIDENCIAL",
]

const negotiations =[
    "VENDA",
    "LOCACAO",
]

export default validate([
    query('status').isString().toUpperCase().isIn(status).withMessage(`Status must be a string and one of: ${status.join(', ')}`),
    query('type').isString().toUpperCase().isIn(types).withMessage(`Type must be a string and one of: ${types.join(', ')}`),
    query('typeStructure').isString().toUpperCase().isIn(typeStructures).withMessage(`TypeStructure must be a string and one of: ${typeStructures.join(', ')}`),
    query('negotiation').isString().toUpperCase().isIn(negotiations).withMessage(`Negotiation must be a string and one of: ${negotiations.join(', ')}`),
    query('valuePerSquareMeter').isFloat({min:0}).withMessage('ValuePerSquareMeter must be a float greater than 0'),
    query('value').isFloat({min:0}).withMessage('Value must be a float greater than 0'),
    query('dormitories').isInt({min:0}).withMessage('Dormitories must be a integer greate than 0'),
    query('suites').isInt({min:0}).optional().withMessage('Suites must be a integer greate than 0'),
    query('bathrooms').isInt({min:0}).withMessage('Bathrooms must be a integer greate than 0'),
    query('parkingSpaces').isInt({min:0}).optional().withMessage('ParkingSpaces must be a integer greate than 0'),
    query('totalArea').isFloat({min:0}).optional().withMessage('TotalArea must be a float greater than 0'),
    query('buildingArea').isFloat({min:0}).optional().withMessage('BuildingArea must be a float greater than 0'),
    query('landArea').isFloat({min:0}).optional().withMessage('LandArea must be a float greater than 0'),
    query('neighborhoodId').isString().isUUID().withMessage('NeighborhoodId must be a string and valid UUID'),
])