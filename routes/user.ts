import { Router, Response, Request } from "express";
import userController from "../controllers/userController";
class UserRouter{
    
    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }
    routes(){
        // this.router.get('/', userController);
    }
}
const userRouter = new UserRouter();
export default userRouter.router;