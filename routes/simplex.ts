import { Router, Response, Request } from "express";
import simplexController from "../controllers/simplexController";
class SimplexRouter{
    
    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }
    routes(){
        this.router.get('/', simplexController.index);
    }
}
const simplexRouter = new SimplexRouter();
export default simplexRouter.router;