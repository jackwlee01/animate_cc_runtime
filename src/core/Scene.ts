import { Drawable } from "./Drawable";
import { Library } from "./Library";


export abstract class Scene{

    draw: (item:Drawable, frame:Float, lerp?:boolean, callback?:(item:Drawable, frame:Float, lerp?:boolean)=>void) => void

    constructor(){
        this.draw = null! // OVERRIDE THIS IN THE BASE CLASS!
    }

  
    createLibrary(name:string, path:string){
        const library = new Library(name, path, this);
        return library;
    }


}