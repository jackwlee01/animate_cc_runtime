import { Drawable } from "./Drawable";
import { Library } from "./Library";


export abstract class Scene{

    draw: (item:Drawable, frame:Float, lerp?:boolean, callback?:(item:Drawable, frame:Float, lerp?:boolean)=>void) => void
    drawImage: (image:HTMLImageElement, sx:number, sy:number, sw:number, sh:number, rx:number, ry:number, rw:number, rh:number) => void


    constructor(){
        this.draw = null! // OVERRIDE THIS IN THE BASE CLASS!
        this.drawImage = null!
    }


    get mouseX():number{
        throw("Override mouseX in base class")
    }


    get mouseY():number{
        throw("Override mouseY in base class")
    }

  
    createLibrary(name:string, path:string){
        const library = new Library(name, path, this);
        return library;
    }


}