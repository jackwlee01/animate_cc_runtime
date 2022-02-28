"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drawable = void 0;
class Drawable {
    constructor(props) {
        this.totalFrames = 1;
        this.name = props.name;
        this.id = props.id;
        this.totalFrames = props.totalFrames;
        this.library = props.library;
    }
    get scene() {
        return this.library.scene;
    }
    draw(frame, lerp, callback) {
        // Override in base class
    }
}
exports.Drawable = Drawable;
