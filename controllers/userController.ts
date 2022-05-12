import { Response, Request } from "express";
import { CallbackError, Schema } from "mongoose";

import userModel from "../models/userModel";
class UserController{

    constructor(){}
    index(req:Request, res: Response){
        res.status(200).send("userController");
    }

}
const userController:UserController =  new UserController();

export default userController;