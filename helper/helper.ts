import { evaluate, simplify } from "mathjs";
import { iTeta } from "../interface/interface";
("mathjs");
export function zj(vb: any[], cj: any) {
//   console.log("🚀 ~ file: helper.ts ~ line 5n cj", cj)
//   console.log("🚀 ~ file: helper.ts ~ line 5 vb", vb)
  // console.log(evaluate('2m / 4m^2').toString());
  let zj1: any[] = [];
  let zjArr: any[] = [];
  // console.log("🚀 ~ file: helper.ts ~ line 13 ~ vb.forEach ~ vb", vb)

  for (let i = 0; i < cj.length + 1; i++) {
    vb.forEach((item, idex) => {
      if (zj1[0] === undefined) {
        if (item[0].includes("M")) {
          if (item[0].includes("-")) {
            zj1?.push("-" + item[i + 2] + "m");
          } else {
            zj1?.push(item[i + 2] + "m");
          }
        } else {
          zj1?.push((parseInt(item[i + 2]) * parseInt(item[0])).toString());
        }
      } else {
        if (item[0].includes("M")) {
          if (item[0].includes("-")) {
            // sumar con lo que este en cero
            zj1[0] = simplify(`${zj1[0]} + - ${item[i + 2]}m`).toString();
          } else {
            
            zj1[0] = simplify(`${zj1[0]} + ${item[i + 2]}m`).toString();         
          }
        } else {
          if (parseInt(item[i + 2]) * parseInt(item[0]) !== 0) {
            zj1[0] = zj1[0] + parseInt(item[i + 2]) * parseInt(item[0]);
          }
        }
      }
    });
 
    zj1[0] = zj1[0].toString().replaceAll("0 m", "0");
    zjArr.push(zj1.toString());
    zj1 = [];
  }

  return zjArr;
}
export function cjZj(zj: any[], cj: any[]) {
  

    let cjZj1: any[] = [];
    const rpcj = cj.map((x) => {
      return x.replaceAll("M", "m");
    });
    
    for (let i = 0; i < rpcj.length; i++) {

      if (zj.includes("m")) {
        if (rpcj.includes("m")) {
          //   console.log(rpcj[i]);
          // cj - zj
          if (zj[i+1] == "0") {
              
            cjZj1.push(` ${rpcj[i]} `);
          } else {
            // console.log(i);

              if(rpcj[i] == '0'){
                  if (`- ${zj[i + 1]} `.split("-").length > 2) {
                      cjZj1.push(simplify(` - (${zj[i + 1]}) `).toString());
                      
                  }else{
                      cjZj1.push(simplify(` - ${zj[i + 1]} `).toString());    
                  }
              }else{
                  
                  cjZj1.push(simplify(`${rpcj[i]} - (${zj[i + 1]}) `).toString());
              }
  
              // }
          }
        }
  
        // console.log(`${rpcj[i]} - ${zj[i+1]} `);
      } else {
          // console.log(rpcj[i]);
  
        if (zj[i] == "0") {
          // console.log(`- ${zj[i]} `.split('-'));
          if (`- ${zj[i + 1]} `.split("-").length > 2) {
            cjZj1.push(simplify(`- (${zj[i + 1]}) `).toString());
          } else {
            if (zj[i + 1] == "0") {
              cjZj1.push(`${rpcj[i]} `);
            } else {
              cjZj1.push(`${rpcj[i]} - ${zj[i + 1]} `);
            }
          }
        } else if (rpcj.includes("m")) {
          cjZj1.push(`${rpcj[i]} - ${zj[i + 1]} `);
        }
      }
  
      // cjZj1.push(simplify(`${rpcj[i]} - ${zj[i+1]} `).toString());
    }
    return cjZj1;
  }


export function identificarColumnaPivote(cjZj: any[], obj: string) {
//   console.log("🚀 ~ file: helper.ts ~ line 108 ~ identificarColumnaPivote ~ obj", obj)
//   console.log("🚀 ~ file: helper.ts ~ line 108 ~ identificarColumnaPivote ~ cjZj", cjZj)
  // console.log(evaluate("2m - 1 < 3",{m:100}));
  let auxValue;
  let auxIndex = 0;
  let optima: boolean = true;
  if (obj === "MAX") {
    for (let i = 0; i < cjZj.length; i++) {
      const element = cjZj[i];
      if (i === 0) {
        auxValue = element;
        auxIndex = i;
      } else {
        auxValue = evaluate(`${auxValue} < ${element}`, { m: 100 })
          ? element
          : auxValue;
        if (evaluate(` 0 => ${element}`, { m: 100 })) {
          optima = false;
        }
      }
    }
  } else {
      console.log("))))))))))))))))))))))))))))");
    for (let i = 0; i < cjZj.length; i++) {
      const element = cjZj[i];
      if (i === 0) {
        auxValue = element;
        auxIndex = i;
      } else {
        //   console.log(`${auxValue} > ${element}`);
        //   console.log(evaluate(`${auxValue} > ${element}`, { m: 100 }));

        auxValue = evaluate(`${auxValue} > ${element}`, { m: 100 })
        ? element
        : auxValue;

        // console.log("🚀 ~ file: helper.ts ~ line 141 ~ identificarColumnaPivote ~ auxValue", auxValue)

 
        // console.log("🚀 ~ file: helper.ts ~ line 145 ~ identificarColumnaPivote ~ auxIndex", auxIndex)

        if (!evaluate(` 0 <= ${element}`, { m: 100 })) {
          optima = false;
        }
      }
    }
  }
  auxIndex = cjZj.indexOf(auxValue)
//   console.log("🚀 columna pivote elegida", auxValue)
//   console.log("🚀 posicion columna pivote elegida", cjZj.indexOf(auxValue))
//   console.log(object);
  return {
    pivote: auxIndex,
    optima: optima,
  };
}

export function tetaSubi(vb: any[], columnaPivote: number): iTeta {

  let teta: any[] = [];
  let pivote: number = 0;
  let auxPivote: number = 1000000000;
  for (let i = 0; i < vb.length; i++) {

    teta.push(vb[i][2] / vb[i][columnaPivote + 3]);
}
  // hayar fila pivote
  teta.forEach((item, index) => {

    if (item > 0) {
      if (item < auxPivote) {
        auxPivote = item;
        pivote = index;
      }
    }
  });

  return { teta, filaPivote: pivote };
}

export function createTable(
  vb: any[],
  cj: any[],
  zj: any[],
  cjZj: any[],
  { teta, filaPivote }: iTeta,
  indexCJ: any[]
) {
  //console.log("🚀 ~ file: helper.ts ~ line 162 ~ createTable ~ indexCJ", indexCJ)

  let table: any[] = [];
  const auxCj = [null, null, "CJ", ...cj, null];
  const auxCabecera = ["CI", "VB", "BI", ...indexCJ, "θ"];

  table.push(auxCj);
  table.push(auxCabecera);

  for (let index = 0; index < vb.length; index++) {
    table.push([...vb[index], teta[index].toString()]);
  }
  table.push([null, "ZJ", ...zj, null]);
  table.push([null, "CJ - ZJ", "~", ...cjZj, null]);

  //console.log("🚀 ~ file: helper.ts ~ line 176 ~ createTable ~ table", table)

  //console.log("tabla ",table);

  return table;
  // [
  // [  null    ,  null  ,    "CJ"      ,  "1"         ,  "2"    ,  "0"    , "0"    ,    "0"  ,     "M"   ,     "M"          , null   ],
  // [  "CI"    ,  "VB"  ,    "BI"      ,  "X1"        ,  "X2"   ,  "S1"   , "S2"   ,    "S3" ,     "A1"  ,     "A2"         ,  Θ     ],
  // [  "M"     ,  "A1"  ,    "2"       ,  "1"         ,  "1"    ,  "-1"   , "0"    ,    "0"  ,     "1"   ,     "0"          , "2"    ],
  // [  "M"     ,  "A2"  ,    "3"       ,  "1"         ,  "1"    ,  "0"    , "-1"   ,    "0"  ,     "0"   ,     "1"          , "3"    ],
  // [  "0"     ,  "S3"  ,    "12"      ,  "1"         ,  "3"    ,  "0"    , "0"    ,    "1"  ,     "0"   ,     "0"          , "12"   ],
  // [   null   ,  "ZJ"  ,    "5 m"     ,    "2 m"     ,  "2 m"  ,  "-1 m" , "-1 m" ,  "0"    ,    "1 m"  ,    "1 m"         , null   ],
  // [   null   ,"CJ-ZJ" ,    "~"       , "2 m-1"      ,  "2m-2" ,  "m"    ,  "m"   ,  "0 "   ,  "1 m - m", "1 m  - m"       , null   ]
  //]
}
export function filaPivoteDividida(
  tabla: any[],
  filaPivote: number,
  columnaPivote: number
) {
  const granCeldaPivote = tabla[2 + filaPivote][3 + columnaPivote];
//   console.log("🚀 ~ file: helper.ts ~ line 231 ~ granCeldaPivote", granCeldaPivote)
//   console.log("🚀 ~ file: helper.ts ~ line 231 ~ columnaPivote", [3 + columnaPivote])
//   console.log("🚀 ~ file: helper.ts ~ line 231 ~ filaPivote", [2 + filaPivote])
  let auxFilaPivote: any[] = [];
  //console.log(tabla);
  tabla.map((value, i) => {
    if(i === 1){
        auxFilaPivote.push(tabla[0][3 + columnaPivote])
        auxFilaPivote.push(tabla[1][3 + columnaPivote])
    }
    if (filaPivote + 2 == i) {
      value.map((celda: string, j: number) => {
        if (j >= 2) {
          if (value.length - 1 >= j) {
            if (celda == "0") {
              auxFilaPivote.push("0");
            } else {
              auxFilaPivote.push(
                evaluate(`${celda}/${granCeldaPivote}`).toString()
              );
            }
          } else {
            auxFilaPivote.push(celda);
          }
        }
      });
    }
  });
  
  return auxFilaPivote;
}

export function algoritmoN(
  tabla: any[],
  filaPivoteDivida: any[],
  filaPivote: number,
  columnaPivote: number
) {
  let valueNewTable: any = [];
//   console.log(")))))))))))))))))))))))))))))))))))))))))))))))))");
  tabla.map((item, index) => {
    if (index >= 2 && index - 2 !== filaPivote && index < tabla.length - 2) {
      const itemAux: any = [];
      item.map((celda: string, i: number) => {
        if(i === 1 || i === 0){
            itemAux.push(item[i])
        } 
        if (i >= 2 && i < item.length - 1) {
          const valorAnterior = celda;
          const valorFilaPivoteAnt = filaPivoteDivida[i];
          const granCeldaPivote = item[3 + columnaPivote];
            // console.log(`${valorAnterior} - (${valorFilaPivoteAnt} * ${granCeldaPivote})`);
          const newvalue = evaluate(
            `${valorAnterior} - (${valorFilaPivoteAnt} * ${granCeldaPivote})`
          ).toString();

          itemAux.push(newvalue);
        }
      });

      valueNewTable.push({ index: index, newValue: itemAux });
    }
  });
  //console.log("🚀 ~ file: helper.ts ~ line 274 ~ valueNewTable", valueNewTable);
  return valueNewTable;
}

export function createTableN(
  tabla: any[],
  filaPivoteDivida: any[],
  filaPivote: number,
  granCeldaPivote: number,
  operacion: string,
  columnaPivote: any
) {
//   console.log("🚀 ~ file: helper.ts ~ line 305 ~ columnaPivote", columnaPivote)
  const newValues = algoritmoN(tabla, filaPivoteDivida, filaPivote, columnaPivote);
 

//   console.log("🚀 ~ file: helper.ts ~ line 274 ~ tabla", tabla)
//console.log("🚀 ~ file: helper.ts ~ line 280 ~ filaPivote", filaPivote)
    filaPivoteDivida.pop()
  tabla[filaPivote+2] = filaPivoteDivida;
  newValues.map( (item:any) =>{
    tabla[item.index] = item.newValue;
  });
  //console.log("🚀 ~ file: helper.ts ~ line 286 ~ tabla", tabla)
  let aux:any=[];
  let auxVB:any=[];
  let auxCj:any=[];
  tabla.map((value,index)=>{
   if(index==1){
    value.map((item:any,index:number)=>{
      if(index>=3 && value.length-1>index){
        aux.push(item);
      };
    });
   }
   if(index>=2 &&  index < tabla.length - 2){
     auxVB.push(value);
   }
   if(index === 0){
    value.map((item:any,index:number)=>{
        if(index>=3 && value.length-1>index){
            auxCj.push(item);
        };
    });
   }
    
  });

  const valueZJ = zj(auxVB, aux);
  const valuecjZj = cjZj(valueZJ, auxCj);
  const {pivote, optima} = identificarColumnaPivote(valuecjZj, operacion);

  let isOptima:boolean = optima;
  const teta = tetaSubi(auxVB, pivote);
//   console.log("🚀 ~ file: helper.ts ~ line 343 ~ teta", teta)
// console.log("🚀 ~ file: helper.ts ~ line 339 ~ pivote", tabla[pivote+2][teta.filaPivote+3])

  const tabla1 = createTable(auxVB, auxCj, valueZJ, valuecjZj, teta,aux);
  const newFilaPivote=filaPivoteDividida(tabla1,teta.filaPivote,pivote);

//   console.log("🚀 ~ file: helper.ts ~ line 342 ~ tabla1", tabla1)
//   [
//     [  null,     null,    'CJ',     '1',      '2',      '0',    '0',       '0',      'M',        'M',     null   ],
//     [  'CI',     'VB',    'BI',     'X1',     'X2',     'S1',   'S2',     'S3',      'A1',       'A2',    'θ'   ],
//     [  '1',      'X1',    '2',      '1',      '1',      '-1',   '0',       '0',      '1',        '0',    '-2'      ],
//     [  'M',      'A2',    '1',      '0',      '0',      '1',    '-1',      '0',      '-1',       '1',     '1'  ],
//     [  '0',      'S3',    '10',     '0',      '2',      '1',    '0',       '1',      '-1',       '0',     '10' ],
//     [  null,     'ZJ',    'm + 2',  '1',      '1',    'm - 1',  '-m',      '0',     '1 - m',     'm',    null],
//     [  null,  'CJ - ZJ',  '~',      '0',      '1',    '1 - m',  'm',       '0',    '2 * m - 1',  '0',    null ]
//   ]
// console.log("🚀 ~ file: helper.ts ~ line 355 ~ isOptima", isOptima)
//     const tableN=createTableN(tabla1, newFilaPivote, teta.filaPivote, granCeldaPivote, operacion);
//     console.log("🚀 ~ file: helper.ts ~ line 356 ~ tableN", tableN)
  
    return {tabla1, newFilaPivote, filaPivote:teta.filaPivote, granCeldaPivote, operacion, optima, pivote};

}
