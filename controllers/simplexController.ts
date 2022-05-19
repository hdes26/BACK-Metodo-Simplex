import { Response, Request } from "express";

class SimplexController{

    constructor(){}
    index(req:Request, res: Response){
        res.status(200).send("simplexController");
    }
    resolve(req:Request, res: Response){
        
        const funcObj = ['50X1', '40X2', '60X3', '0S1', '0S2', '–MA1'];
        
        const SA = [
            ['3X1', '8X2', '12X3', 'S1',   '' ,  ''     ,'=', '700'],
            ['2X1', ''   , '5X3' ,   '', + 'S2',  ''    ,'=', '100'],
            ['X2',  ''   ,    '' ,   '',    '' ,  'A1'  ,'=', '500']
        ]
        



        res.status(200).send("simplexController");
    }
    
}
const simplexController:SimplexController =  new SimplexController();

export default simplexController;