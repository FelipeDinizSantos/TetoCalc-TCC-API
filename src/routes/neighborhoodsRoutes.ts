import { Router} from "express";
import { NeighborhoodsController } from "../controllers/NeighborhoodsController";
const neighborhoodsRoutes = Router();

const neighborhoodsController = new NeighborhoodsController();

neighborhoodsRoutes.get('/', neighborhoodsController.index);

export { neighborhoodsRoutes };