"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layer = void 0;
const Drawable_1 = require("./Drawable");
const Frame_1 = require("./Frame");
const math_1 = require("./util/math");
class Layer extends Drawable_1.Drawable {
    constructor(props) {
        super(Object.assign(Object.assign({}, props), { totalFrames: 0, id: `${props.clip.id}.${props.name}`, library: props.clip.library }));
        this.clip = props.clip;
        this.type = props.type;
        this.clippedBy = props.clippedBy || null;
        this.index = this.clip.layers.length;
        this.frames = [];
        this.framesByName = {};
        this.labels = [];
    }
    createFrame(props) {
        const frame = new Frame_1.Frame(Object.assign(Object.assign({}, props), { layer: this }));
        // TODO: Allow for more flexibility when adding frames
        if (this.frames.length > 0 && this.lastFrame.index + this.lastFrame.totalFrames != frame.index)
            throw ("Must add next frame at previous frame.index+frame.duration");
        this.framesByName[frame.name] = frame;
        if (frame.index + frame.totalFrames > this.totalFrames)
            this.totalFrames = frame.index + frame.totalFrames;
        if (frame.labelName) {
            this.labels.push(frame);
        }
        this.clip.__addFrame(frame);
        /* TODO: Determine if this should be nessessary
        if(this.firstFrame){
            this.firstFrame.prev = frame
            frame.next = this.firstFrame
        }
        */
        if (this.lastFrame) {
            this.lastFrame.next = frame;
            frame.prev = this.lastFrame;
        }
        this.frames.push(frame);
        return frame;
    }
    get lastFrame() {
        return this.frames[this.frames.length - 1];
    }
    get firstFrame() {
        return this.frames[0];
    }
    keyframeAt(frame) {
        // TODO: Binary search would be a good optimisation here
        frame = (0, math_1.modWrap)(frame, this.totalFrames);
        for (const keyframe of this.frames) {
            if (keyframe.index <= frame && keyframe.index + keyframe.totalFrames > frame)
                return keyframe;
        }
        return null;
    }
    draw(frame, lerp, callback) {
        var keyframe = this.keyframeAt(frame);
        if (keyframe != null) {
            this.library.scene.draw(keyframe, frame, lerp, callback);
        }
    }
}
exports.Layer = Layer;
