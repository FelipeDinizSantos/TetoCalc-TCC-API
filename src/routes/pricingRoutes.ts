import { Router} from "express";
import { PricingController } from "../controllers/PricingController";
import generatePricingRequest from "../requests/generatePricingRequest";

const pricingRoutes = Router();
const pricingController = new PricingController();

pricingRoutes.get('/generate', generatePricingRequest, pricingController.generate);

export { pricingRoutes };