import { Clip } from "./Clip";
import { Drawable } from "./Drawable";
import { Frame } from "./Frame";
import { Library } from "./Library";


class Layer extends Drawable{

    public frames:Array<Frame>;
    public framesByName:Record<string, Frame>;
    public labels:Array<Frame>;
    public clip:Clip;


    constructor(props:{clip:Clip, library:Library, name:string, id:string, totalFrames:number}){
        super(props);
        this.frames = [];
        this.framesByName = {};
        this.labels = [];
        this.clip = props.clip;
        this.clip.addLayer(this);
    }

}
