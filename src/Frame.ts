import { ClipInstance } from "./ClipInstance";
import { Drawable } from "./Drawable";
import { Layer } from "./json/AnimationJson";
import { Library } from "./Library";
import { SpriteInstance } from "./SpriteInstance";


export class Frame extends Drawable{

    index:number;
    duration:number;
    labelName:string|null;
    layer:Layer;
    instances:Array<ClipInstance|SpriteInstance>;


    constructor(props:{layer:Layer, library:Library, name:string, id:string, totalFrames:Int, index:number, duration:number, labelName:string|null}){
        super(props);
        this.instances = [];
        this.layer = props.layer;
        this.index = props.index;
        this.labelName = props.labelName;
        this.duration = props.duration;
    }

}
