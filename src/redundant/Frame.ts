import { Clip } from "./Clip";
import { ClipInstance } from "./ClipInstance";
import { Drawable } from "./Drawable";
import { Layer } from "./Layer";
import { Library } from "./Library";
import { SpriteInstance } from "./SpriteInstance";


export class Frame extends Drawable{

    index:number
    labelName:string|null;
    layer:Layer;
    clip:Clip;
    instances:Array<ClipInstance|SpriteInstance> = [];


    constructor(props:{clip:Clip, layer:Layer, library:Library, name:string, id:string, index:number, labelName:string|undefined, totalFrames:number}){
        super({...props});
        this.clip = props.clip;
        this.layer = props.layer;
        this.index = props.index;
        this.labelName = props.labelName || null;
    }


    public addInstance(instance:ClipInstance|SpriteInstance){
        this.instances.push(instance);
    }

}
