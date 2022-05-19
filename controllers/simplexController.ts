import { Response, Request } from "express";
import { cjZj, zj as funzj } from "../helper/helper";

class SimplexController{

    constructor(){}
    index(req:Request, res: Response){
        res.status(200).send("simplexController");
    }
    resolve(req:Request, res: Response){
        
        // const funcObj = ['50X1', '40X2', '60X3', '0S1', '0S2', '–MA1'];
        const funcObj = ['1X1', '2X2', '0S1','0S2','0S3', 'MA1',  'MA2', ];
        const SA = [  
        //  ['1X1', '2X2'  , '0S1'  ,'0S2'  ,'0S3' , 'MA1',  'MA2', ]  
            ['1X1', '1X2'  , '-1S1' , '0'   ,  '0' , '1A1',  '0'  ,  '=' , '2' ],
            ['1X1', '1X2'  ,  '0'   , '-1S2',  '0' ,  '0' ,  '1A2',  '=' , '3' ],
            ['1X1', '3X2'  ,  '0'   ,  '0'  , '1S3',  '0' ,   '0' ,  '=' , '12']
        ]
        const operacion = 'MIN';
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
        // console.log("🚀 ~ file: simplexController.ts ~ line 50 ~ SimplexController ~ resolve ~ indexCJ", indexCJ)

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
        
        // console.log(vb);

        const auxValue: any[] = [];
        let auxValue2: any[] = [];
        const auxValue3: any[] = [];
        SA.forEach((value)=>{
        // const funcObj = ['1X1', '2X2', '0S1', 'MA1', '0S2', 'MA2', '0S3'];

            // ['1X1', '1X2'  , '-1S1',   '1A1' ,  '0'    , '0'   ,  '0'   ,'=', '2'],
            // ['1X1', '1X2'  ,  '0'  ,    '0'  ,  '-1S2' ,  '1A2',  '0'   ,'=', '3'],
            // ['1X1', '3X2' ,  '0'  ,    '0'  ,  '0'    ,   '0'  , '1S3' ,'=', '12']
            auxValue.push(value[value.length-1]);
            value.forEach((item) =>{
                // ['1X1', '1X2'  , '-1S1',   '1A1' ,  '0'    , '0'   ,  '0'   ,'=', '2']
                if(item.includes('X')){
                    auxValue2.push(item.split('X')[0]);
                }else if(item.includes('S')){
                    auxValue2.push(item.split('S')[0]);
                }else if(item.includes('A')){
                    auxValue2.push(item.split('A')[0]);
                }else if(item.includes('0') ){
                    auxValue2.push('0');
                }
            });
            auxValue3.push(auxValue2);
            auxValue2 = [];
 

        })
        vb.map((value,index)=>{
            return value?.push(auxValue[index]);
        });
        
        vb.map((value, index)=>{
            return value?.push(...auxValue3[index]);
        });
        
        // console.log(vb.filter(x => x !== undefined));

        const zj =  funzj(vb, indexCJ);

        const zj2 =  cjZj(zj, ValuesCJ);
        console.log("🚀 ~ file: simplexController.ts ~ line 117 ~ SimplexController ~ resolve ~ zj2", zj2)

        // console.log("🚀 ~ file: simplexController.ts ~ line 122 ~ SimplexController ~ resolve ~ zj", zj)
        // mas positiva cuando sea maximizar y mas negativa cuando sea minimizar 
        
        // para señalar la columna pivote nos vasamos en cj  y para identificar en las restricciones sumamos 3, para las zj sumamos 1
        
        res.status(200).send("simplexController");
    }
    
    
}
const simplexController:SimplexController =  new SimplexController();

export default simplexController; 