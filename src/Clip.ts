import { Drawable } from "./Drawable";


export class Clip extends Drawable{

    layers:Array<Layer>;
    layersById:Record<string, Layer>;
    layersByName:Record<string, Layer>;
    framesByName:Record<string, Frame>;

    
    constructor(){
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

}