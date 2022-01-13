import { Drawable } from "./Drawable";
import { Vec2 } from "./geom/Vec2";
import { Instance } from "./Instance";
import { InstanceProps } from "./Instance"

type LoopKind = 'loop' // TODO: HANDLE OTHER LOOP KINDS | 'PlayOnce' | 'SingleFrame' | 'PlayOnceReverse' | 'LoopReverse'


type ClipInstanceBehavior = {
    type: 'graphic'
    loop:LoopKind;
    firstFrame:Float;
} | {
    type: 'movieclip'
}


export type ClipInstanceProps = InstanceProps & { 
    transformationPoint:Vec2,   
    behaviour:ClipInstanceBehavior
}


export class ClipInstance extends Instance{

    transformationPoint:Vec2
    behaviour:ClipInstanceBehavior
    //color:Null<Color>;
    
    
    constructor(props:ClipInstanceProps){
        super(props);
        this.behaviour = props.behaviour;
        this.transformationPoint = props.transformationPoint;
    }


    public get item(){
        return this.library.clipsByName[this.itemName];
    }


    public draw(frame:Float, callback?:(item:Drawable, frame:Float)=>void):void{
        if(this.behaviour.type == 'graphic'){
            frame = this.behaviour.firstFrame;
        }
        this.library.context.draw(this.item, frame, callback)
    }


    public visit(frame:Float, callback:(item:Drawable, frame:Float)=>void):void{
        if(this.behaviour.type == 'graphic'){
            frame = this.behaviour.firstFrame;
        }
        callback(this, frame)
    }

}
