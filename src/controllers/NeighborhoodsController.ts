import { Response, Request } from "express";
import { GetAllNeighborhoodsService } from "../services/GetAllNeighborhoodsService";

const getAllNeighborhoodsService = new GetAllNeighborhoodsService();

class NeighborhoodsController{
    public async index(req: Request, res:Response){
        const neighborhoods = await getAllNeighborhoodsService.execute();
        res.status(200).json({
            neighborhoods,
        })
    }
}

export {NeighborhoodsController};