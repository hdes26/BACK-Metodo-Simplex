"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTableN = exports.algoritmoN = exports.filaPivoteDividida = exports.createTable = exports.tetaSubi = exports.identificarColumnaPivote = exports.cjZj = exports.zj = void 0;
const mathjs_1 = require("mathjs");
("mathjs");
function zj(vb, cj) {
    // console.log(evaluate('2m / 4m^2').toString());
    let zj1 = [];
    let zjArr = [];
    for (let i = 0; i < cj.length + 1; i++) {
        vb.forEach((item, idex) => {
            if (zj1[0] === undefined) {
                if (item[0].includes("M")) {
                    if (item[0].includes("-")) {
                        zj1 === null || zj1 === void 0 ? void 0 : zj1.push("-" + item[i + 2] + "m");
                    }
                    else {
                        zj1 === null || zj1 === void 0 ? void 0 : zj1.push(item[i + 2] + "m");
                    }
                }
                else {
                    zj1 === null || zj1 === void 0 ? void 0 : zj1.push((parseInt(item[i + 2]) * parseInt(item[0])).toString());
                }
            }
            else {
                if (item[0].includes("M")) {
                    if (item[0].includes("-")) {
                        // sumar con lo que este en cero
                        zj1[0] = mathjs_1.simplify(`${zj1[0]} + - ${item[i + 2]}m`).toString();
                    }
                    else {
                        zj1[0] = mathjs_1.simplify(`${zj1[0]} + ${item[i + 2]}m`).toString();
                    }
                }
                else {
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
exports.zj = zj;
function cjZj(zj, cj) {
    let cjZj1 = [];
    const rpcj = cj.map((x) => {
        return x.replaceAll("M", "m");
    });
    for (let i = 0; i < rpcj.length; i++) {
        if (zj.includes("m")) {
            if (rpcj.includes("m")) {
                // cj - zj
                if (zj[i + 1] == "0") {
                    cjZj1.push(` ${rpcj[i]} `);
                }
                else {
                    if (rpcj[i] == '0') {
                        if (`- ${zj[i + 1]} `.split("-").length > 2) {
                            cjZj1.push(mathjs_1.simplify(` - (${zj[i + 1]}) `).toString());
                        }
                        else {
                            cjZj1.push(mathjs_1.simplify(` - ${zj[i + 1]} `).toString());
                        }
                    }
                    else {
                        cjZj1.push(mathjs_1.simplify(`${rpcj[i]} - (${zj[i + 1]}) `).toString());
                    }
                    // }
                }
            }
        }
        else {
            if (zj[i] == "0") {
                if (`- ${zj[i + 1]} `.split("-").length > 2) {
                    cjZj1.push(mathjs_1.simplify(`- (${zj[i + 1]}) `).toString());
                }
                else {
                    if (zj[i + 1] == "0") {
                        cjZj1.push(`${rpcj[i]} `);
                    }
                    else {
                        cjZj1.push(`${rpcj[i]} - ${zj[i + 1]} `);
                    }
                }
            }
            else if (rpcj.includes("m")) {
                cjZj1.push(`${rpcj[i]} - ${zj[i + 1]} `);
            }
        }
    }
    return cjZj1;
}
exports.cjZj = cjZj;
function identificarColumnaPivote(cjZj, obj) {
    let auxValue;
    let auxIndex = 0;
    let optima = true;
    if (obj === "MAX") {
        for (let i = 0; i < cjZj.length; i++) {
            const element = cjZj[i];
            if (i === 0) {
                auxValue = element;
                auxIndex = i;
            }
            else {
                auxValue = mathjs_1.evaluate(`${auxValue} < ${element}`, { m: 100 })
                    ? element
                    : auxValue;
                if (mathjs_1.evaluate(` 0 => ${element}`, { m: 100 })) {
                    optima = false;
                }
            }
        }
    }
    else {
        for (let i = 0; i < cjZj.length; i++) {
            const element = cjZj[i];
            if (i === 0) {
                auxValue = element;
                auxIndex = i;
            }
            else {
                auxValue = mathjs_1.evaluate(`${auxValue} > ${element}`, { m: 100 })
                    ? element
                    : auxValue;
                if (!mathjs_1.evaluate(` 0 <= ${element}`, { m: 100 })) {
                    optima = false;
                }
            }
        }
    }
    auxIndex = cjZj.indexOf(auxValue);
    return {
        pivote: auxIndex,
        optima: optima,
    };
}
exports.identificarColumnaPivote = identificarColumnaPivote;
function tetaSubi(vb, columnaPivote) {
    let teta = [];
    let pivote = 0;
    let auxPivote = 1000000000;
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
exports.tetaSubi = tetaSubi;
function createTable(vb, cj, zj, cjZj, { teta, filaPivote }, indexCJ) {
    let table = [];
    const auxCj = [null, null, "CJ", ...cj, null];
    const auxCabecera = ["CI", "VB", "BI", ...indexCJ, "θ"];
    table.push(auxCj);
    table.push(auxCabecera);
    for (let index = 0; index < vb.length; index++) {
        table.push([...vb[index], teta[index].toString()]);
    }
    table.push([null, "ZJ", ...zj, null]);
    table.push([null, "CJ - ZJ", "~", ...cjZj, null]);
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
exports.createTable = createTable;
function filaPivoteDividida(tablaDiv, filaPivote, columnaPivote) {
    const granCeldaPivote = tablaDiv[2 + filaPivote][3 + columnaPivote];
    let auxFilaPivote = [];
    tablaDiv.forEach((value, i) => {
        if (i === 1) {
            auxFilaPivote.push(tablaDiv[0][3 + columnaPivote]);
            auxFilaPivote.push(tablaDiv[1][3 + columnaPivote]);
        }
        if (filaPivote + 2 == i) {
            value.forEach((celda, j) => {
                if (j >= 2) {
                    if (value.length - 1 >= j) {
                        if (celda == "0") {
                            auxFilaPivote.push("0");
                        }
                        else {
                            auxFilaPivote.push(mathjs_1.evaluate(`${celda}/${granCeldaPivote}`).toString());
                        }
                    }
                    else {
                        auxFilaPivote.push(celda);
                    }
                }
            });
        }
    });
    return auxFilaPivote;
}
exports.filaPivoteDividida = filaPivoteDividida;
function algoritmoN(tablaN2, filaPivoteDivida, filaPivote, columnaPivote) {
    let valueNewTable = [];
    tablaN2.forEach((item, index) => {
        if (index >= 2 && index - 2 !== filaPivote && index < tablaN2.length - 2) {
            const itemAux = [];
            item.forEach((celda, i) => {
                if (i === 1 || i === 0) {
                    itemAux.push(item[i]);
                }
                if (i >= 2 && i < item.length - 1) {
                    const valorAnterior = celda;
                    const valorFilaPivoteAnt = filaPivoteDivida[i];
                    const granCeldaPivote = item[3 + columnaPivote];
                    // console.log(`${valorAnterior} - (${valorFilaPivoteAnt} * ${granCeldaPivote})`);
                    const newvalue = mathjs_1.evaluate(`${valorAnterior} - (${valorFilaPivoteAnt} * ${granCeldaPivote})`).toString();
                    itemAux.push(newvalue);
                }
            });
            valueNewTable.push({ index: index, newValue: itemAux });
        }
    });
    return valueNewTable;
}
exports.algoritmoN = algoritmoN;
function createTableN(tablaN, filaPivoteDivida, filaPivote, granCeldaPivote, operacion, columnaPivote) {
    const newValues = algoritmoN(tablaN, filaPivoteDivida, filaPivote, columnaPivote);
    filaPivoteDivida.pop();
    tablaN[filaPivote + 2] = filaPivoteDivida;
    newValues.map((item) => {
        tablaN[item.index] = item.newValue;
    });
    let aux = [];
    let auxVB = [];
    let auxCj = [];
    tablaN.map((value, index) => {
        if (index == 1) {
            value.map((item, index) => {
                if (index >= 3 && value.length - 1 > index) {
                    aux.push(item);
                }
                ;
            });
        }
        if (index >= 2 && index < tablaN.length - 2) {
            auxVB.push(value);
        }
        if (index === 0) {
            value.map((item, index) => {
                if (index >= 3 && value.length - 1 > index) {
                    auxCj.push(item);
                }
                ;
            });
        }
    });
    const valueZJ = zj(auxVB, aux);
    const valuecjZj = cjZj(valueZJ, auxCj);
    const { pivote, optima } = identificarColumnaPivote(valuecjZj, operacion);
    let isOptima = optima;
    const teta = tetaSubi(auxVB, pivote);
    const tabla1 = createTable(auxVB, auxCj, valueZJ, valuecjZj, teta, aux);
    const newFilaPivote = filaPivoteDividida(tabla1, teta.filaPivote, pivote);
    //   [
    //     [  null,     null,    'CJ',     '1',      '2',      '0',    '0',       '0',      'M',        'M',     null   ],
    //     [  'CI',     'VB',    'BI',     'X1',     'X2',     'S1',   'S2',     'S3',      'A1',       'A2',    'θ'   ],
    //     [  '1',      'X1',    '2',      '1',      '1',      '-1',   '0',       '0',      '1',        '0',    '-2'      ],
    //     [  'M',      'A2',    '1',      '0',      '0',      '1',    '-1',      '0',      '-1',       '1',     '1'  ],
    //     [  '0',      'S3',    '10',     '0',      '2',      '1',    '0',       '1',      '-1',       '0',     '10' ],
    //     [  null,     'ZJ',    'm + 2',  '1',      '1',    'm - 1',  '-m',      '0',     '1 - m',     'm',    null],
    //     [  null,  'CJ - ZJ',  '~',      '0',      '1',    '1 - m',  'm',       '0',    '2 * m - 1',  '0',    null ]
    //   ]
    return { tabla1, newFilaPivote, filaPivote: teta.filaPivote, granCeldaPivote, operacion, optima, pivote };
}
exports.createTableN = createTableN;
