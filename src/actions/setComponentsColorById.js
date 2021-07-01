import {setBaseColor} from "./GLColor.js";

export function setComponentsColorById(components,color){
    for(let i = 0;i < components.length;i++){
        this.scene.traverse((item)=>{
            if(item.id === components[i]){
               if(item.material instanceof Array){
                   for(let j =0; j < item.material.length;j++){
                      setBaseColor(item.material[j]);
                       item.material[j].color = color;
                       item.material[j].emissive =   color;
                   }
               }else{
                   setBaseColor(item.material);
                   item.material.color =  color;
                   item.material.emissive = color;
               }
            }
        })
    }
}
