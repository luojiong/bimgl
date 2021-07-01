export function clearComponentsColorById(components){
    for(let i = 0;i < components.length;i++){
        this.scene.traverse((item)=>{
            if(item.id === components[i]){
                if(item.material instanceof Array){
                    for(let j =0; j < item.material.length;j++){
                        let baseClor = item.material[j].BaseColor ? item.material[j].BaseColor : item.material[j].color;
                        item.material[j].color = baseClor;
                        item.material[j].emissive =   baseClor;
                    }
                }else{
                    let baseClor = item.material.BaseColor ? item.material.BaseColor : item.material.color;
                    item.material.color =  baseClor;
                    item.material.emissive = baseClor;
                }
            }
        })
    }
}
