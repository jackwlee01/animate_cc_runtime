import { Drawable } from "./Drawable";
import { Frame } from "./Frame";
import { Layer, LayerProps } from "./Layer";
import { DrawableProps } from './Drawable'


export type ClipProps = Omit<DrawableProps, 'totalFrames'|'id'>


export class Clip extends Drawable{

    layers:Array<Layer>;
    layersById:Record<string, Layer>;
    layersByName:Record<string, Layer>;
    framesByName:Record<string, Frame>;


    constructor(props:ClipProps){
        super({
            ...props,
            totalFrames:0,
            id:`${props.library.name}.${props.name}`
        })
        
        this.layers = [];
        this.layersById = {};
        this.layersByName = {};
        this.framesByName = {};
    }


    public createLayer(props:Omit<LayerProps, 'clip'>){
        const layer = new Layer({...props, clip:this});
        this.layers.push(layer);
        this.layersById[layer.id] = layer;
        this.layersByName[layer.name] = layer;
        if(layer.totalFrames > this.totalFrames) this.totalFrames = layer.totalFrames;

        return layer;
    }


    public addFrame(frame:Frame){
        this.framesByName[frame.name] = frame;
    }

}