import { Response, Request } from "express";

class SimplexController{

    constructor(){}
    index(req:Request, res: Response){
        res.status(200).send("simplexController");
    }
    resolve(req:Request, res: Response){
        
        // const funcObj = ['50X1', '40X2', '60X3', '0S1', '0S2', '–MA1'];
        const funcObj = ['1X1', '2X2', '0S1', 'MA1', '0S2', 'MA2', '0S3'];
        
        // const SA = [
        //     ['3X1', '8X2', '12X3', 'S1',   '' ,  ''     ,'=', '700'],
        //     ['2X1', ''   , '5X3' ,   '', + 'S2',  ''    ,'=', '100'],
        //     ['X2',  ''   ,    '' ,   '',    '' ,  'A1'  ,'=', '500']
        // ]
            const SA = [
            ['X1', 'X2'  , '-S1',   'A1' ,  ''    , ''   ,  ''   ,'=', '700'],
            ['X1', 'X2'  ,  ''  ,    ''  ,  '-S2' ,  'A2',  ''   ,'=', '100'],
            ['X1', '3X2' ,  ''  ,    ''  ,  ''    ,   ''  , 'S3' ,'=', '500']
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
        console.log("🚀 ~ file: simplexController.ts ~ line 50 ~ SimplexController ~ resolve ~ indexCJ", indexCJ)

        let cbAux: string[] = [];
        
        const vb = funcObj.map((value)=>{
            if(value.includes('S')){
                // si tiene un artificial y una de olgura se escoje la artificial 
                const artificial = funcObj.filter((x)=>x.includes('MA'+value.split('S')[1]));                
                if(artificial.length > 0){
                    cbAux.push(artificial[0]);
                    return [ artificial[0].split('A')[0], 'A'+artificial[0].split('A')[1] ]    
                }
                return [ value.split('S')[0], 'S'+value.split('S')[1] ];
                
            }else if(value.includes('A')){
                // validar si la variable artificial ya entro 
                if(!cbAux.includes(value)){
                    return [ value.split('A')[0], 'A'+value.split('A')[1] ];
                }
            }
        }).filter(x => x !== undefined);
        // const variablesElegidas = variblesArtificiales.map(x => {
        //     if
        // });
        
        console.log(vb);

        const auxValue=SA.map((value)=>{
            return value[value.length-1]

        })
        vb.map((value,index)=>{
            return value?.push(auxValue[index]);
        })

        

        console.log(SA)

        res.status(200).send("simplexController");
    }
    
}
const simplexController:SimplexController =  new SimplexController();

export default simplexController;