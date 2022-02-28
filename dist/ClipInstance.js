import { Vec2 } from "./geom/Vec2";
import { Instance } from "./Instance";
import { modWrap } from "./util/math";
export class ClipInstance extends Instance {
    constructor(props) {
        super(props);
        this.behaviour = props.behaviour || { type: 'movieclip' };
        this.transformationPoint = props.transformationPoint || new Vec2({ x: 0, y: 0 });
    }
    get item() {
        return this.library.clipsByName[this.itemName];
    }
    draw(frame, lerp, callback) {
        if (this.behaviour.type == 'graphic') {
            frame = this.behaviour.firstFrame + modWrap(frame, 1);
        }
        this.library.scene.draw(this.item, frame, lerp, callback);
    }
}
