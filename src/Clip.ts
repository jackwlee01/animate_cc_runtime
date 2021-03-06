import { Drawable } from "./Drawable";
import { Frame } from "./Frame";
import { Layer, LayerProps } from "./Layer";
import { DrawableProps } from './Drawable'
import { modWrap } from "./util/math";
import { Float } from "./types/Float";

export type ClipProps = Omit<DrawableProps, 'totalFrames'|'id'>


export class Clip extends Drawable{

    layers:Array<Layer>;
    layersById:Record<string, Layer>;
    layersByName:Record<string, Layer>
    framesById:Record<string, Frame>
    framesByLabel:Record<string, Frame>


    constructor(props:ClipProps){
        super({
            ...props,
            totalFrames:0,
            id:`${props.library.name}.clips.${props.name}`,
        })
        
        this.layers = [];
        this.layersById = {};
        this.layersByName = {};
        this.framesById = {};
        this.framesByLabel = {};
    }


    public createLayer(props:Omit<LayerProps, 'clip'>){
        const layer = new Layer({...props, clip:this});
        this.layers.push(layer);
        this.layersById[layer.id] = layer;
        this.layersByName[layer.name] = layer;
        if(layer.totalFrames > this.totalFrames) this.totalFrames = layer.totalFrames;

        return layer;
    }


    __addFrame(frame:Frame){
        this.framesById[frame.id] = frame;
        if(frame.layer.totalFrames > this.totalFrames) this.totalFrames = frame.layer.totalFrames;
        if(frame.labelName) this.framesByLabel[frame.labelName] = frame;
    }


    public draw(frame:Float, lerp?:boolean, callback?:(item:Drawable, frame:Float, lerp?:boolean)=>void){
        for(const layer of this.layers){
            if(layer.totalFrames==0) continue;
            var f = modWrap(frame, layer.totalFrames);
            if(layer.totalFrames>=f){
                this.library.scene.draw(layer, frame, lerp, callback);
            }
        }
    }

   
}