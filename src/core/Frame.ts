import { ClipInstance, ClipInstanceProps } from "./ClipInstance";
import { Drawable } from "./Drawable";
import { Layer } from "./Layer";
import { SpriteInstance, SpriteInstanceProps } from "./SpriteInstance";
import { DrawableProps } from "./Drawable";
import { Instance } from "./Instance";


type Int = number;


export type FrameProps = Omit<DrawableProps, 'id' | 'library'> & {
    index:Int,
    layer:Layer,
    labelName:string|undefined,
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


    public createClipInstance(props:Omit<ClipInstanceProps, 'frame'>){
        const clipInstance = new ClipInstance({...props, frame:this})
        this.instances.push(clipInstance)
        return clipInstance;
    }


    public createSpriteInstance(props:Omit<SpriteInstanceProps, 'frame'>){
        const spriteInstance = new SpriteInstance({...props, frame:this})
        this.instances.push(spriteInstance)
        return spriteInstance
    }


    public draw(frame:Float, lerp?:boolean, callback?:(item:Drawable, frame:Float)=>void):void{
        for(const instance of this.instances){
            this.library.context.draw(instance, frame, lerp, callback)
        }
    }


    public visit(frame:Float, callback:(item:Drawable, frame:Float)=>void):void{
        callback(this, frame)
        for(const instance of this.instances){
            instance.visit(frame, callback)
        }
    }

}
