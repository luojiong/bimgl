import {CSS2DObject} from '../lib/CSS2DRenderer.js'
export const setWorldPosition = function (components,elements,position){
    for(let i = 0;i < components.length;i++){
        this.scene.traverse((item)=>{
            if(item.id === components[i]){
                let Label = new CSS2DObject( elements[i]);
                item.add( Label );
            }
        })
    }
}
export const removeWorldPosition = function (components){
    for(let i = 0;i < components.length;i++){
        this.scene.traverse((item)=>{
            if(item.id === components[i]){
                item.clear();
            }
        })
    }
}
