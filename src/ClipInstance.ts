import { Drawable } from "./Drawable";
import { Vec2 } from "./geom/Vec2";
import { Instance } from "./Instance";
import { InstanceProps } from "./Instance"
import { Float } from "./types/Float";
import { modWrap } from "./util/math";

type LoopKind = 'loop' // TODO: HANDLE OTHER LOOP KINDS | 'PlayOnce' | 'SingleFrame' | 'PlayOnceReverse' | 'LoopReverse'


type ClipInstanceBehavior = {
    type: 'graphic'
    loop:LoopKind;
    firstFrame:Float;
} | {
    type: 'movieclip'
}


export type ClipInstanceProps = InstanceProps & { 
    transformationPoint?:Vec2,   
    behaviour?:ClipInstanceBehavior
}


export class ClipInstance extends Instance{

    transformationPoint:Vec2
    behaviour:ClipInstanceBehavior
    
    
    constructor(props:ClipInstanceProps){
        super(props);
        this.behaviour = props.behaviour || { type: 'movieclip' };
        this.transformationPoint = props.transformationPoint || new Vec2({x:0, y:0});
    }


    public get item(){
        return this.library.clipsByName[this.itemName];
    }


    public draw(frame:Float, lerp?:boolean, callback?:(item:Drawable, frame:Float, lerp?:boolean)=>void):void{
        if(this.behaviour.type == 'graphic'){
            frame = this.behaviour.firstFrame + modWrap(frame, 1);
        }
        this.library.scene.draw(this.item, frame, lerp, callback)
    }


}
