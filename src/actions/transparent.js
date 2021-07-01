export function transparentComponentsById(components=[],opacity){
    for(let i = 0;i < components.length;i++){
        this.scene.traverse((item)=>{
            if(item.id === components[i]){
                if(item.material instanceof Array){
                    for(let j = 0;j<item.material.length;j++){
                        item.material[j].opacity = opacity;
                        item.material[j].transparent = true;
                    }
                }else{
                    item.material.opacity = opacity;
                    item.material.transparent = true;
                }
            }
        })
    }
}
