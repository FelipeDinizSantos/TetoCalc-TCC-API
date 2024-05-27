import { Router} from "express";
import { PricingController } from "../controllers/PricingController";
import pricingGenerateValidations from "../requests/pricingGenerateRequest";

const pricingRoutes = Router();
const pricingController = new PricingController();

pricingRoutes.get('/generate', pricingGenerateValidations, pricingController.generate);

export { pricingRoutes };