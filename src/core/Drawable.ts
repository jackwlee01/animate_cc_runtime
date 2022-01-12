import { Library } from "./Library";

type Int = number;
type Float = number;


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


    public visit(frame:Float, callback:(item:Drawable, frame:Float, ...args:any)=>void):void{
        // Override in base class
    }


    public draw(frame:Float, callback?:(item:Drawable, frame:Float)=>void){
        this.library.context.draw(this, frame, callback);
    }

}