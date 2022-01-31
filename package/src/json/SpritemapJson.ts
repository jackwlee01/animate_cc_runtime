import { Float } from "../types/Float"

type JsonSprite = {
    name:string,
    x:Float,
    y:Float,
    w:Float,
    h:Float,
    rotated:boolean    
}



type JsonAtlas = {
    sprites:Array<{sprite:JsonSprite}>;
}


type JsonSize = {
    w:Float;
    h:Float;
}


type JsonMeta = {
    app:string;
    version:string;
    image:string;
    format:string;
    size:JsonSize;
    resolution:string;
}


export type JsonSpriteMap = {
    atlas:JsonAtlas;
    meta:JsonMeta;
}

