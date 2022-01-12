import { Clip } from "./Clip";
import { Drawable } from "./Drawable";
import { Frame, FrameProps } from "./Frame";
import { DrawableProps } from "./Drawable"
import { modWrap } from "./util";


type Float = number;


export type LayerProps = Omit<DrawableProps, 'totalFrames'|'id'|'library'> & {
    clip:Clip
}


export class Layer extends Drawable{

    public frames:Array<Frame>;
    public framesByName:Record<string, Frame>;
    public labels:Array<Frame>;
    public clip:Clip;


    constructor(props:LayerProps){
        super({
            ...props,
            totalFrames:0,
            id:`${props.clip.name}.${props.name}`,
            library: props.clip.library,
        });
        
        this.frames = [];
        this.framesByName = {};
        this.labels = [];
        this.clip = props.clip;
    }


    public createFrame(props:Omit<FrameProps, 'layer'>){
        const frame = new Frame({...props, layer:this});

        this.frames.push(frame)
        this.framesByName[frame.name] = frame;
        if(frame.labelName){
            this.labels.push(frame);
        }
        this.clip.addFrame(frame);

        return frame;
    }


    public keyframeAt(frame:Float){
        frame = modWrap(frame, this.totalFrames);
        for(const keyframe of this.frames){
            if(keyframe.index<=frame && keyframe.index+keyframe.totalFrames > frame)
            return keyframe;
        }
        return null;
    }


    public visit(frame:Float, callback:(frame:Float, item:Drawable)=>void):void{
        var keyframe = this.keyframeAt(frame)
        if(keyframe!=null) callback(frame, keyframe);
    }

}
