"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../helper/helper");
class SimplexController {
    constructor() { }
    index(req, res) {
        res.status(200).send("simplexController");
    }
    resolve(req, res) {
        let funcObj = req.body.funcObj;
        console.log("🚀 ~ file: simplexController.ts ~ line 13 ~ SimplexController ~ resolve ~ funcObj", funcObj);
        // const funcObj = ['100X1', '50X2' , '210X3', '0S1' , '0S2','MA1' ,'MA2'];
        let SA = req.body.SA;
        console.log("🚀 ~ file: simplexController.ts ~ line 17 ~ SimplexController ~ resolve ~ SA", SA);
        const operacion = 'MIN';
        const ValuesCJ = funcObj.map(x => {
            if (x.includes('X')) {
                return x.split('X')[0];
            }
            else if (x.includes('S')) {
                return x.split('S')[0];
            }
            else if (x.includes('A')) {
                return x.split('A')[0];
            }
        });
        const indexCJ = funcObj.map((x) => {
            if (x.includes('X')) {
                return 'X' + x.split('X')[1];
            }
            else if (x.includes('S')) {
                return 'S' + x.split('S')[1];
            }
            else if (x.includes('A')) {
                return 'A' + x.split('A')[1];
            }
        });
        //console.log("🚀 ~ file: simplexController.ts ~ line 50 ~ SimplexController ~ resolve ~ indexCJ", indexCJ)
        let cbAux = [];
        const vb = funcObj.map((value) => {
            console.log(value);
            if (value.includes('S')) {
                // si tiene un artificial y una de olgura se escoje la artificial 
                const artificial = funcObj.filter((x) => x.includes('MA' + value.split('S')[1]));
                if (artificial.length > 0) {
                    cbAux.push(artificial[0]);
                    return [artificial[0].split('A')[0], 'A' + artificial[0].split('A')[1]];
                }
                return [value.split('S')[0], 'S' + value.split('S')[1]];
            }
            else if (value.includes('A')) {
                // validar si la variable artificial ya entro 
                if (!cbAux.includes(value)) {
                    return [value.split('A')[0], 'A' + value.split('A')[1]];
                }
            }
        }).filter(x => x !== undefined);
        // const variablesElegidas = variblesArtificiales.map(x => {
        //     if
        // });
        // console.log(vb);
        const auxValue = [];
        let auxValue2 = [];
        const auxValue3 = [];
        SA.forEach((value) => {
            // const funcObj = ['1X1', '2X2', '0S1', 'MA1', '0S2', 'MA2', '0S3'];
            // ['1X1', '1X2'  , '-1S1',   '1A1' ,  '0'    , '0'   ,  '0'   ,'=', '2'],
            // ['1X1', '1X2'  ,  '0'  ,    '0'  ,  '-1S2' ,  '1A2',  '0'   ,'=', '3'],
            // ['1X1', '3X2' ,  '0'  ,    '0'  ,  '0'    ,   '0'  , '1S3' ,'=', '12']
            auxValue.push(value[value.length - 1]);
            value.forEach((item) => {
                // ['1X1', '1X2'  , '-1S1',   '1A1' ,  '0'    , '0'   ,  '0'   ,'=', '2']
                if (item.includes('X')) {
                    auxValue2.push(item.split('X')[0]);
                }
                else if (item.includes('S')) {
                    auxValue2.push(item.split('S')[0]);
                }
                else if (item.includes('A')) {
                    auxValue2.push(item.split('A')[0]);
                }
                else if (item.includes('0')) {
                    auxValue2.push('0');
                }
            });
            auxValue3.push(auxValue2);
            auxValue2 = [];
        });
        vb.map((value, index) => {
            return value === null || value === void 0 ? void 0 : value.push(auxValue[index]);
        });
        vb.map((value, index) => {
            return value === null || value === void 0 ? void 0 : value.push(...auxValue3[index]);
        });
        console.log(vb.filter(x => x !== undefined));
        const zj = helper_1.zj(vb, indexCJ);
        const cjzj = helper_1.cjZj(zj, ValuesCJ);
        // console.log("🚀 ~ file: simplexController.ts ~ line 117 ~ SimplexController ~ resolve ~ cjzj", cjzj)
        // console.log("🚀 ~ file: simplexController.ts ~ line 122 ~ SimplexController ~ resolve ~ zj", zj)
        // mas positiva cuando sea maximizar y mas negativa cuando sea minimizar 
        let { pivote, optima } = helper_1.identificarColumnaPivote(cjzj, operacion);
        let isOptima = optima;
        // console.log("🚀 ~ file: simplexController.ts ~ line 123 ~ SimplexController ~ resolve ~ Columna pivote", pivote)
        const teta = helper_1.tetaSubi(vb, pivote);
        // console.log("🚀 ~ file: simplexController.ts ~ line 125 ~ SimplexController ~ resolve ~ Fila pivote", teta.filaPivote)
        const arrayTables = [];
        // armar primera tabla
        const tabla1 = helper_1.createTable(vb, ValuesCJ, zj, cjzj, teta, indexCJ);
        // console.log("🚀 ~ file: simplexController.ts ~ line 136 ~ SimplexController ~ resolve ~ vb", vb)
        arrayTables.push({
            table: [...tabla1],
            pivoteX: teta.filaPivote + 2,
            pivoteY: pivote + 3
        });
        console.log("🚀 ~ file: simplexController.ts ~ line 129 ~ SimplexController ~ resolve ~ tabla1", tabla1);
        // console.log("🚀 ~ file: simplexController.ts ~ line 123 ~ SimplexController ~ resolve ~ optima", optima);
        const newFilaPivote = helper_1.filaPivoteDividida(tabla1, teta.filaPivote, pivote);
        // console.log("🚀 ~ file: simplexController.ts ~ line 131 ~ SimplexController ~ resolve ~ newFilaPivote", newFilaPivote)
        const granCeldaPivote = tabla1[2 + teta.filaPivote][3 + pivote];
        // console.log("🚀 ~ file: simplexController.ts ~ line 131 ~ SimplexController ~ resolve ~ newFilaPivote", newFilaPivote)
        // let celdaPivote  = tabla1[teta.filaPivote+3][pivote+4];
        // console.log("🚀 ~ file: simplexController.ts ~ line 132 ~ SimplexController ~ resolve ~ celdaPivote", celdaPivote)
        //let isOptima:boolean = verifyTableOptima(cjzj,operacion);
        // const tableN=createTableN(tabla1, newFilaPivote, teta.filaPivote, granCeldaPivote, operacion);
        // arrayTables.push(tableN.tabla1);
        // while(){
        // }
        // if(optima){
        // res.status(200).send(arrayTables.length);
        // }
        const tableN = helper_1.createTableN(tabla1, newFilaPivote, teta.filaPivote, granCeldaPivote, operacion, pivote);
        arrayTables.push({
            table: [...tableN.tabla1],
            pivoteX: tableN.filaPivote + 2,
            pivoteY: tableN.pivote + 3
        });
        // [
        //     [  null , null, 'CJ', '1', '2',  '0',  '0',  '0', 'M',  'M',  null ],
        //     [  'CI' , 'VB', 'BI','X1', 'X2', 'S1', 'S2', 'S3', 'A1', 'A2', 'θ'],
        //     [  '1', 'X1', '1',  '1', '1', '-2', '1',  '0', '2', '-1', '-1' ],
        //     [  '0',  'S1', '1',  '0', '0',  '1',  '-1', '0', '-1', '1',  '1' ],
        //     [  '0', 'S3', '9',  '0','2', '0',  '1',  '1','0', '-1', '-9'],
        //     [  null, 'ZJ', '1', '1',  '1',  '-2', '1',  '0',  '2', '-1', null ],
        //     [  null,     'CJ - ZJ','~','1  - 1','1  - 2', '-2  - 0','1  - 0', '0  - 0','- 2 ',   '-1  - m',null  ]
        //   ]
        // @ts-ignore
        // console.log("🚀 ~ file: simplexController.ts ~ line 154 ~ SimplexController ~ resolve ~ tableN2.tabla1", tableN2.tabla1)
        while (!isOptima) {
            const tableN2 = helper_1.createTableN(tableN.tabla1, tableN.newFilaPivote, tableN.filaPivote, tableN.granCeldaPivote, operacion, tableN.pivote);
            isOptima = tableN2.optima;
            arrayTables.push({
                table: [...tableN2.tabla1],
                pivoteX: tableN2.pivote + 2,
                pivoteY: tableN2.filaPivote + 3
            });
        }
        ;
        // para señalar la columna pivote nos vasamos en cj  y para identificar en las restricciones sumamos 3, para las zj sumamos 1
        res.status(200).send(arrayTables);
    }
}
const simplexController = new SimplexController();
exports.default = simplexController;
