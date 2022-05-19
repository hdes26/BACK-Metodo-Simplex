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
        
        const ValuesCJ = funcObj.map(x =>{
            if(x.includes('X')){

                return x.split('X')[0];

            }else if( x.includes('S')){

                return x.split('S')[0];

            }else if(x.includes('A')){

                return x.split('A')[0];

            }
        });
        const indexCJ = funcObj.map(x =>{
            if(x.includes('X')){

                return 'X' + x.split('X')[1];

            }else if( x.includes('S')){

                return  'S' + x.split('S')[1];

            }else if(x.includes('A')){

                return 'A' + x.split('A')[1];

            }
        });
        console.log("🚀 ValuesCJ", ValuesCJ)
        console.log("🚀 indexCJ", indexCJ)

        const Ci=funcObj.map((value)=>{
            if(value.includes('S')){
                return [ value.split('S')[0], 'S'+value.split('S')[1] ]
            }else if(value.includes('A')){
                return value.split('A')
            }

        })
        
        console.log(Ci);

        res.status(200).send("simplexController");
    }
    
}
const simplexController:SimplexController =  new SimplexController();

export default simplexController;