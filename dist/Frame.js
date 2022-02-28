import { ClipInstance } from "./ClipInstance";
import { Drawable } from "./Drawable";
import { SpriteInstance } from "./SpriteInstance";
export class Frame extends Drawable {
    constructor(props) {
        super(Object.assign(Object.assign({}, props), { id: `${props.layer.id}.${props.index}`, library: props.layer.library }));
        this.instances = [];
        this.layer = props.layer;
        this.index = props.index;
        this.labelName = props.labelName || null;
    }
    createClipInstance(props) {
        const clipInstance = new ClipInstance(Object.assign(Object.assign({}, props), { frame: this, totalFrames: this.totalFrames }));
        this.instances.push(clipInstance);
        return clipInstance;
    }
    createSpriteInstance(props) {
        const spriteInstance = new SpriteInstance(Object.assign(Object.assign({}, props), { frame: this, totalFrames: this.totalFrames }));
        this.instances.push(spriteInstance);
        return spriteInstance;
    }
    draw(frame, lerp, callback) {
        for (const instance of this.instances) {
            this.library.scene.draw(instance, frame, lerp, callback);
        }
    }
}
