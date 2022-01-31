import { Drawable } from "./Drawable";
import { Library } from "./Library";


export class Scene{

    draw: (item:Drawable, frame:Float, lerp?:boolean, callback?:(item:Drawable, frame:Float, lerp?:boolean)=>void) => void
    drawImage: (image:HTMLImageElement, sx:number, sy:number, sw:number, sh:number, rx:number, ry:number, rw:number, rh:number) => void
    pixelData:Record<string, { ctx:CanvasRenderingContext2D, imageData:ImageData, image:HTMLImageElement }>


    constructor(){
        this.draw = null! // OVERRIDE THIS IN THE BASE CLASS!
        this.drawImage = null!
        this.pixelData = {}
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


    getPixelData(image:HTMLImageElement){
        if(image.complete==false) throw("Image has not loaded!")

        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const ctx = document.createElement('canvas').getContext('2d')!
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

        return {
            ctx,
            imageData,
            image,
        }
    }


}