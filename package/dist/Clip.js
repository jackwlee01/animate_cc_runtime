"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clip = void 0;
const Drawable_1 = require("./Drawable");
const Layer_1 = require("./Layer");
const math_1 = require("./util/math");
class Clip extends Drawable_1.Drawable {
    constructor(props) {
        super(Object.assign(Object.assign({}, props), { totalFrames: 0, id: `${props.library.name}.clips.${props.name}` }));
        this.layers = [];
        this.layersById = {};
        this.layersByName = {};
        this.framesById = {};
        this.framesByLabel = {};
    }
    createLayer(props) {
        const layer = new Layer_1.Layer(Object.assign(Object.assign({}, props), { clip: this }));
        this.layers.push(layer);
        this.layersById[layer.id] = layer;
        this.layersByName[layer.name] = layer;
        if (layer.totalFrames > this.totalFrames)
            this.totalFrames = layer.totalFrames;
        return layer;
    }
    __addFrame(frame) {
        this.framesById[frame.id] = frame;
        if (frame.layer.totalFrames > this.totalFrames)
            this.totalFrames = frame.layer.totalFrames;
        if (frame.labelName)
            this.framesByLabel[frame.labelName] = frame;
    }
    draw(frame, lerp, callback) {
        for (const layer of this.layers) {
            if (layer.totalFrames == 0)
                continue;
            var f = (0, math_1.modWrap)(frame, layer.totalFrames);
            if (layer.totalFrames >= f) {
                this.library.scene.draw(layer, frame, lerp, callback);
            }
        }
    }
}
exports.Clip = Clip;
