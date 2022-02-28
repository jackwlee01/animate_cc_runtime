"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vec3 = void 0;
class Vec3 {
    constructor(props) {
        this.x = props.x;
        this.y = props.y;
        this.z = props.z;
        this.data = new Float32Array([this.x, this.y, this.z]);
    }
}
exports.Vec3 = Vec3;
