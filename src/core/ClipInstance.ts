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

}
