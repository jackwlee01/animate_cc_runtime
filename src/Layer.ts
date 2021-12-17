import { Clip } from "./Clip";
import { Drawable } from "./Drawable";
import { Frame } from "./Frame";
import { Library } from "./Library";


export class Layer extends Drawable{

    public frames:Array<Frame>;
    public framesByName:Record<string, Frame>;
    public labels:Array<Frame>;
    public clip:Clip;


    constructor(props:{clip:Clip, library:Library, name:string, id:string}){
        super({...props, totalFrames:0});
        this.frames = [];
        this.framesByName = {};
        this.labels = [];
        this.clip = props.clip;
        this.clip.addLayer(this);
    }


    public addFrame(frame:Frame){
        this.frames.push(frame)
        this.framesByName[frame.name] = frame;
        if(frame.labelName){
            this.labels.push(frame);
        }
    }

}
