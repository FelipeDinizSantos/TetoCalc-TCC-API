import { NeighborhoodsRepository } from "../../repositories/NeighborhoodsRepository"

class GetAllNeighborhoodsService{
    private neighborhoodsRepository;
    
    constructor(){
        this.neighborhoodsRepository = new NeighborhoodsRepository();
    }

    public async execute(){
        const neighborhoods = await this.neighborhoodsRepository.getAll();
        
        return neighborhoods;
    }
}

export {GetAllNeighborhoodsService}