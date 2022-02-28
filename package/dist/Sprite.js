"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprite = void 0;
const Drawable_1 = require("./Drawable");
class Sprite extends Drawable_1.Drawable {
    constructor(props) {
        super(Object.assign(Object.assign({}, props), { totalFrames: 1, library: props.atlas.library, id: `${props.atlas.library.name}.sprites.${props.name}` }));
        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height = props.height;
        this.rotated = props.rotated;
        this.atlas = props.atlas;
    }
    getPixel(x, y, transform) {
        const point = new DOMPoint(x, y);
        const imatrix = transform.inverse();
        const local = point.matrixTransform(imatrix);
        if (local.x < 0 || local.x >= this.width)
            return null;
        if (local.y < 0 || local.y >= this.height)
            return null;
        return this.atlas.getPixel(this.x + local.x, this.y + local.y);
    }
    isSolidPixelAt(x, y, transform, alphaThreshold = 1) {
        const pixel = this.getPixel(x, y, transform);
        return pixel && pixel[3] > alphaThreshold;
    }
    draw(frame, lerp, callback) {
        this.scene.drawImage(this.atlas.image, this.x, this.y, this.width, this.height, 0, 0, this.width, this.height);
    }
}
exports.Sprite = Sprite;
