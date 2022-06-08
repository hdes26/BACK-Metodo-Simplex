"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const simplexController_1 = __importDefault(require("../controllers/simplexController"));
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', simplexController_1.default.index);
    }
}
const userRouter = new UserRouter();
exports.default = userRouter.router;
