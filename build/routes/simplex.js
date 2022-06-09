"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const simplexController_1 = __importDefault(require("../controllers/simplexController"));
class SimplexRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post('/resolve', simplexController_1.default.resolve);
    }
}
const simplexRouter = new SimplexRouter();
exports.default = simplexRouter.router;
