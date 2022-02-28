"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frame = void 0;
const ClipInstance_1 = require("./ClipInstance");
const Drawable_1 = require("./Drawable");
const SpriteInstance_1 = require("./SpriteInstance");
class Frame extends Drawable_1.Drawable {
    constructor(props) {
        super(Object.assign(Object.assign({}, props), { id: `${props.layer.id}.${props.index}`, library: props.layer.library }));
        this.instances = [];
        this.layer = props.layer;
        this.index = props.index;
        this.labelName = props.labelName || null;
    }
    createClipInstance(props) {
        const clipInstance = new ClipInstance_1.ClipInstance(Object.assign(Object.assign({}, props), { frame: this, totalFrames: this.totalFrames }));
        this.instances.push(clipInstance);
        return clipInstance;
    }
    createSpriteInstance(props) {
        const spriteInstance = new SpriteInstance_1.SpriteInstance(Object.assign(Object.assign({}, props), { frame: this, totalFrames: this.totalFrames }));
        this.instances.push(spriteInstance);
        return spriteInstance;
    }
    draw(frame, lerp, callback) {
        for (const instance of this.instances) {
            this.library.scene.draw(instance, frame, lerp, callback);
        }
    }
}
exports.Frame = Frame;
