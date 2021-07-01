import {Color} from "../../files/three.module.js";

export class GLColor{
    constructor(color) {
        return new Color(color)
    }
}
export function setBaseColor(material){
    if(!material.BaseColor){
        material.BaseColor =  new Color(material.color.getHex());
    }
}
