import { Drawable } from "./Drawable";
import { Library } from "./Library";


export abstract class AnimationContext{

    draw: (item:Drawable, frame:Float, callback?:(item:Drawable, frame:Float, lerp?:boolean)=>void, lerp?:boolean) => void

    constructor(){
        this.draw = null! // OVERRIDE THIS IN THE BASE CLASS!
    }

  
    createLibrary(name:string, path:string){
        const library = new Library(name, path, this);
        return library;
    }


}