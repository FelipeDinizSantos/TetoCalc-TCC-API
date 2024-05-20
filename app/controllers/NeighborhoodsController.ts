import { Response, Request } from "express";
import { GetAllNeighborhoodsService } from "../services/GetAllNeighborhoodsService";
import { CreateNeighborhoodsService } from "../services/CreateNeighborhoodsService";

const getAllNeighborhoodsService = new GetAllNeighborhoodsService();
const createNeighborhoodsService = new CreateNeighborhoodsService();

class NeighborhoodsController{
    public async index(req:Request, res:Response){
        const neighborhoods = await getAllNeighborhoodsService.execute();

        res.status(200).json({
            neighborhoods,
        })
    }

    public async store(req:Request, res:Response){
        const {neighborhoodRanking, name, description, accessibilityRanking, valuePerSquareMeterSale, valuePerSquareMeterRental, additionalInformation, cityId} = req.body;

        await createNeighborhoodsService.execute({neighborhoodRanking, name, description, accessibilityRanking, valuePerSquareMeterSale, valuePerSquareMeterRental, additionalInformation, cityId})

        res.send(201).json({status: "Neighborhood Created!"});
    }   
}

export {NeighborhoodsController};