import { evaluate, simplify } from "mathjs"; 'mathjs';
export function zj (vb: any[], cj:any) {
    // console.log(evaluate('2m / 4m^2').toString());
    let zj1: any[] = [];
    let zjArr: any[] = [];
    // console.log("🚀 ~ file: helper.ts ~ line 13 ~ vb.forEach ~ vb", vb)

    for (let i = 0; i < cj.length + 1; i++) {

        vb.forEach( (item,idex) =>{
            if(zj1[0] === undefined){
                
                if(item[0].includes('M')){
                    if(item[0].includes('-')){
                        zj1?.push('-'+item[i+2] + 'm');
                    }else{
                        zj1?.push(item[i+2] + 'm' );
                    }
                }else{
                    zj1?.push(parseInt(item[i+2]) * parseInt(item[0])); 
                }

            }else{
                if(item[0].includes('M')){
                    if(item[0].includes('-')){
                        // sumar con lo que este en cero 
                        zj1[0] = evaluate(`${zj1[0]} + - ${item[i+2]}m`)

                    }else{
                        zj1[0] = evaluate(`${zj1[0]} + ${item[i+2]}m`)
                    }
                }else{
                    if(parseInt(item[i+2]) * parseInt(item[0]) !== 0){
                        zj1[0] =  zj1[0] + parseInt(item[i+2]) * parseInt(item[0]);
                    }
                    
                }
            }

            
        });
        zj1[0] = zj1[0].toString().replaceAll('0 m', '0');
        zjArr.push(zj1.toString());
        zj1 = [];
    }
       

    return zjArr;
}
export function cjZj (zj: any[], cj:any[]) {
    console.log("🚀 ~ file: helper.ts ~ line 51 ~ cjZj ~ zj", zj)
    console.log("🚀 ~ file: helper.ts ~ line 51 ~ cjZj ~ cj", cj)
    let cjZj1: any[] = [];
    const rpcj = cj.map(x => {
        return x.replaceAll('M','m');
    });
    
    for (let i = 0; i < rpcj.length ; i++) {

        if(zj.includes('m')){

            if(rpcj.includes('m')){
                if(rpcj[i] == '0'){
                    cjZj1.push(`- ${rpcj[i]} `);        
                }else{

                    cjZj1.push(evaluate(`${rpcj[i]} - ${zj[i+1]} `).toString());        
                }
            }

            // console.log(`${rpcj[i]} - ${zj[i+1]} `);
        }else{
            if(rpcj[i] == '0'){
                // console.log(`- ${zj[i]} `.split('-'));
                if(`- ${zj[i+1]} `.split('-').length > 2){
                    cjZj1.push(simplify(`- ${zj[i+1]} `).toString());        
                }else{
                    if(zj[i+1] == '0'){
                        cjZj1.push(`${zj[i+1]} `);        
                    }else{
                        cjZj1.push(`- ${zj[i+1]} `);        

                    }
                }
            }else if (rpcj.includes('m')){
                cjZj1.push(`${zj[i+1]}  - ${rpcj[i]}`);        
            } 
        }

        // cjZj1.push(evaluate(`${rpcj[i]} - ${zj[i+1]} `).toString());
        
    }
    return cjZj1;
}