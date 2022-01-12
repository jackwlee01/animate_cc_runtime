import { Library } from "./Library";
import { Sprite, SpriteProps } from "./Sprite";


export type AtlasProps = {
    library:Library,
    image:HTMLImageElement,
    app:string,
    version:string,
    imagePath:string,
    format:string,
    size:{w:Float, h:Float},
    resolution:string
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
    }

    

}
