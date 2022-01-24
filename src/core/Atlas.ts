import { Library } from "./Library";
import { Sprite } from "./Sprite";


export type AtlasProps = {
    library:Library,
    image:HTMLImageElement,
    app:string,
    version:string,
    imagePath:string,
    format:string,
    size:{w:Float, h:Float},
    resolution:string,
}


export class Atlas{
    library:Library;
    sprites:Array<Sprite>;
    image:HTMLImageElement;

    app:string;
    version:string;
    imagePath:string;
    format:string;
    size:{w:Float, h:Float};
    resolution:string;
    pixelData:{
        ctx:CanvasRenderingContext2D,
        imageData:ImageData,
    }

    
    constructor(props:AtlasProps){
        this.sprites = [];
        this.library = props.library;
        this.image = props.image;
        this.app = props.app;
        this.version = props.version;
        this.imagePath = props.imagePath;
        this.format = props.format;
        this.size = props.size;
        this.resolution = props.resolution;

        if(this.image.complete==false) throw("Image has not loaded!")

        const canvas = document.createElement('canvas')
        canvas.width = this.image.width
        canvas.height = this.image.height
        const ctx = document.createElement('canvas').getContext('2d')!
        ctx.drawImage(this.image, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

        this.pixelData = {
            ctx,
            imageData,
        }
    }


    public getPixel(x:Float, y:Float){
        x = Math.floor(x)
        y = Math.floor(y)
        const data = this.pixelData.imageData.data



        //if(x<0 || x>=this.pixelData.ctx.canvas.width) return null;
        //if(y<0 || y>=this.pixelData.ctx.canvas.height) return null;

        console.log("Global", x, y)

        //let i = (x*4) + (y*this.pixelData.imageData.width*4)
        //let i = (x*4) * this.pixelData.imageData.width * (y*4)
        let i = x + (y*this.pixelData.imageData.width)

        return [
            data[(i*4) + 0],
            data[(i*4) + 1],
            data[(i*4) + 2],
            data[(i*4) + 3],
        ]
    }


}
