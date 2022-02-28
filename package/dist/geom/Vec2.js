"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vec2 = void 0;
class Vec2 {
    constructor(props) {
        this.x = props.x;
        this.y = props.y;
        this.data = new Float32Array([this.x, this.y]);
    }
}
exports.Vec2 = Vec2;
