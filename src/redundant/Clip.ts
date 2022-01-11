import { Drawable } from "./Drawable";
import { Frame } from "./Frame";
import { Layer } from "./Layer";
import { Library } from "./Library";



export class Clip extends Drawable{

    layers:Array<Layer>;
    layersById:Record<string, Layer>;
    layersByName:Record<string, Layer>;
    framesByName:Record<string, Frame>;


    constructor(props:{library:Library, name:string, id:string}){
        super({...props, totalFrames:0})
        this.layers = [];
        this.layersById = {};
        this.layersByName = {};
        this.framesByName = {};
    }


    public addLayer(layer:Layer){
        this.layers.push(layer);
        this.layersById[layer.id] = layer;
        this.layersByName[layer.name] = layer;
        if(layer.totalFrames > this.totalFrames) this.totalFrames = layer.totalFrames;
    }


    public addFrame(frame:Frame){
        this.framesByName[frame.name] = frame;
    }

}