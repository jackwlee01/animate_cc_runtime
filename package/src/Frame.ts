import { ClipInstance, ClipInstanceProps } from "./ClipInstance";
import { Drawable } from "./Drawable";
import { Layer } from "./Layer";
import { SpriteInstance, SpriteInstanceProps } from "./SpriteInstance";
import { DrawableProps } from "./Drawable";
import { Int } from "./types/Int";
import { Float } from "./types/Float";



export type FrameProps = Omit<DrawableProps, 'id' | 'library'> & {
    index:Int,
    layer:Layer,
    labelName?:string|undefined|null,
}


export class Frame extends Drawable{

    index:number
    labelName:string|null;
    layer:Layer;
    instances:Array<ClipInstance|SpriteInstance> = [];
    prev:Frame|undefined;
    next:Frame|undefined;


    constructor(props:FrameProps){
        super({
            ...props,
            id: `${props.layer.id}.${props.index}`,
            library: props.layer.library
        });
        
        this.layer = props.layer;
        this.index = props.index;
        this.labelName = props.labelName || null;
    }


    public createClipInstance(props:Omit<ClipInstanceProps, 'frame'|'totalFrames'>){
        const clipInstance = new ClipInstance({...props, frame:this, totalFrames:this.totalFrames})
        this.instances.push(clipInstance)
        return clipInstance;
    }


    public createSpriteInstance(props:Omit<SpriteInstanceProps, 'frame'|'totalFrames'>){
        const spriteInstance = new SpriteInstance({...props, frame:this, totalFrames:this.totalFrames})
        this.instances.push(spriteInstance)
        return spriteInstance
    }


    public draw(frame:Float, lerp?:boolean, callback?:(item:Drawable, frame:Float)=>void):void{
        for(const instance of this.instances){
            this.library.scene.draw(instance, frame, lerp, callback)
        }
    }

}
