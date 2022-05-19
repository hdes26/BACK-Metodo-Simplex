import { Router, Response, Request } from "express";
import SimplexController from "../controllers/simplexController";
class UserRouter{
    
    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }
    routes(){
        this.router.get('/', SimplexController.index);
    }
}
const userRouter = new UserRouter();
export default userRouter.router;