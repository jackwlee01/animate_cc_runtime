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


    public visit(frame:Float, callback:(item:Drawable, frame:Float)=>void):void{
        // Override in base class
    }

    /*
    Implement draw in context
    */

    /*
    #if kha
    public function draw<T>(buffer:kha.Canvas, position:Float=0, item:T=null, callback:(buffer:kha.Canvas,position:Float,item:Dynamic,drawable:Drawable)->Void = null){}
    public function visit<T>(buffer:kha.Canvas, position:Float, item:T, callback:(buffer:kha.Canvas, item:T, drawable:Drawable, position:Float)->Void){}
    #end
    */
}