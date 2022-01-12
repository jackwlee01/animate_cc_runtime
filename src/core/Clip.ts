import { Drawable } from "./Drawable";
import { Frame } from "./Frame";
import { Layer, LayerProps } from "./Layer";
import { DrawableProps } from './Drawable'
import { modWrap } from "./util";

type Float = number;
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
            id:`${props.library.name}.clips.${props.name}`
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


    public visit(frame:Float, callback:(frame:Float, item:Drawable)=>void):void{
        for(const layer of this.layers){
            if(layer.totalFrames==0) continue;
            var f = modWrap(frame, layer.totalFrames);
            if(layer.totalFrames>=f) callback(frame, layer);
        }
    }

}