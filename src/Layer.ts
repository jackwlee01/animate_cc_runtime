import { Clip } from "./Clip";
import { Drawable } from "./Drawable";
import { Frame, FrameProps } from "./Frame";
import { DrawableProps } from "./Drawable"
import { modWrap } from "./util/math";
import { Int } from "./types/Int";
import { Float } from "./types/Float";



export type LayerProps = Omit<DrawableProps, 'totalFrames'|'id'|'library'> & {
    clip:Clip
    type: 'Normal'|'Clipper',
    clippedBy?:string|null,
}


export class Layer extends Drawable{

    public index:Int;
    public type: LayerProps['type'];
    public clippedBy:string|null;
    public frames:Array<Frame>;
    public framesByName:Record<string, Frame>;
    public labels:Array<Frame>;
    public clip:Clip;


    constructor(props:LayerProps){
        super({
            ...props,
            totalFrames:0,
            id:`${props.clip.id}.${props.name}`,
            library: props.clip.library,
        });
        
        this.clip = props.clip;
        this.type = props.type;
        this.clippedBy = props.clippedBy || null;
        this.index = this.clip.layers.length;
        this.frames = [];
        this.framesByName = {};
        this.labels = [];
    }


    public createFrame(props:Omit<FrameProps, 'layer'>){
        const frame = new Frame({...props, layer:this});

        // TODO: Allow for more flexibility when adding frames
        if(this.frames.length>0 && this.lastFrame.index+this.lastFrame.totalFrames != frame.index) throw("Must add next frame at previous frame.index+frame.duration")

        this.framesByName[frame.name] = frame;
        if(frame.index+frame.totalFrames > this.totalFrames) this.totalFrames = frame.index+frame.totalFrames
        if(frame.labelName){
            this.labels.push(frame);
        }
        this.clip.__addFrame(frame);
        /* TODO: Determine if this should be nessessary
        if(this.firstFrame){
            this.firstFrame.prev = frame
            frame.next = this.firstFrame
        }
        */
        if(this.lastFrame){
            this.lastFrame.next = frame
            frame.prev = this.lastFrame
        }
        this.frames.push(frame)
        return frame;
    }


    public get lastFrame(){
        return this.frames[this.frames.length-1];
    }


    public get firstFrame(){
        return this.frames[0];
    }


    public keyframeAt(frame:Float){
        // TODO: Binary search would be a good optimisation here
        frame = modWrap(frame, this.totalFrames);
        for(const keyframe of this.frames){
            if(keyframe.index<=frame && keyframe.index+keyframe.totalFrames > frame)
            return keyframe;
        }
        return null;
    }


    public draw(frame:Float, lerp?:boolean, callback?:(item:Drawable, frame:Float, lerp?:boolean)=>void):void{
        var keyframe = this.keyframeAt(frame)
        if(keyframe!=null){
            this.library.scene.draw(keyframe, frame, lerp, callback);
        }
    }

}
