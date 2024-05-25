import { Router} from "express";
import { PricingController } from "../controllers/PricingController";
import { validate } from "../middlewares/validationMiddleware";
import { query } from "express-validator";

const pricingRoutes = Router();
const pricingController = new PricingController();

pricingRoutes.get(
    '/generate',
    validate([
        query('status').isString().withMessage('Status must be a string').toUpperCase(),
        query('type').isString().withMessage('Status must be a string').toUpperCase(),
        query('typeStructure').isString().withMessage('Status must be a string').toUpperCase(),
        query('negotiation').isString().withMessage('Status must be a string').toUpperCase(),
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
    ]), 
    pricingController.generate
);

export { pricingRoutes };