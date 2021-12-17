import { Clip } from "./Clip";
import { Frame } from "./Frame";
import { Matrix, Vec2, Vec3 } from "./geom";
import { Instance } from "./Instance";
import { Library } from "./Library";

type LoopKind = 'Loop' | 'PlayOnce' | 'SingleFrame' | 'PlayOnceReverse' | 'LoopReverse'


export class ClipInstance extends Instance<Clip>{
    loop:LoopKind;
    firstFrame:Float|null;
    //color:Null<Color>;

    
    constructor(props:{
        name:string,
        id:string,
        totalFrames:number,
        library:Library,
        
        item:Clip,
        matrix:Matrix,
        position:Vec3,
        scale:Vec3,
        rotation:Vec3,
        transformationPoint:Vec2,
        frame:Frame,
        firstInstance:Instance<any>|null,

        loop:LoopKind,
        firstFrame:Float|null
    }){
        super(props);
        this.loop = props.loop;
        this.firstFrame = props.firstFrame;
    }

}
