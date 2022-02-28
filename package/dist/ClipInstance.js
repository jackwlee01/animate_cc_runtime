"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClipInstance = void 0;
const Vec2_1 = require("./geom/Vec2");
const Instance_1 = require("./Instance");
const math_1 = require("./util/math");
class ClipInstance extends Instance_1.Instance {
    constructor(props) {
        super(props);
        this.behaviour = props.behaviour || { type: 'movieclip' };
        this.transformationPoint = props.transformationPoint || new Vec2_1.Vec2({ x: 0, y: 0 });
    }
    get item() {
        return this.library.clipsByName[this.itemName];
    }
    draw(frame, lerp, callback) {
        if (this.behaviour.type == 'graphic') {
            frame = this.behaviour.firstFrame + (0, math_1.modWrap)(frame, 1);
        }
        this.library.scene.draw(this.item, frame, lerp, callback);
    }
}
exports.ClipInstance = ClipInstance;
