import { Router} from "express";
import { neighborhoodsRoutes } from "./neighborhoodsRoutes";
const routes = Router();

routes.use('/bairros', neighborhoodsRoutes);

export {routes};