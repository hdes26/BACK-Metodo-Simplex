import { Response, Request } from "express";

class SimplexController{

    constructor(){}
    index(req:Request, res: Response){
        res.status(200).send("simplexController");
    }

}
const simplexController:SimplexController =  new SimplexController();

export default simplexController;