import { Router} from "express";
import { neighborhoodsRoutes } from "./neighborhoodsRoutes";
import { pricingRoutes } from "./pricingRoutes";
const routes = Router();

routes.use('/pricing', pricingRoutes);
routes.use('/neighborhoods', neighborhoodsRoutes);

export {routes};