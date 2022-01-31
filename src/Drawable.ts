import { Library } from "./Library";
import { Float } from "./types/Float";
import { Int } from "./types/Int";


export type DrawableProps = {
    name:string,
    id:string,
    totalFrames:Int,
    library:Library;
}


export abstract class Drawable{
    name:string;
    id:string;
    totalFrames:Int = 1;
    library:Library;


    constructor(props:DrawableProps){
        this.name = props.name;
        this.id = props.id;
        this.totalFrames = props.totalFrames;
        this.library = props.library;
    }


    public get scene(){
        return this.library.scene;
    }


    public draw(frame:Float, lerp?:boolean, callback?:(item:Drawable, frame:Float, lerp?:boolean)=>void){
        // Override in base class
    }

}