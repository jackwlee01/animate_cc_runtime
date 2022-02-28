import { Drawable } from "./Drawable";
import { Layer } from "./Layer";
import { modWrap } from "./util/math";
export class Clip extends Drawable {
    constructor(props) {
        super(Object.assign(Object.assign({}, props), { totalFrames: 0, id: `${props.library.name}.clips.${props.name}` }));
        this.layers = [];
        this.layersById = {};
        this.layersByName = {};
        this.framesById = {};
        this.framesByLabel = {};
    }
    createLayer(props) {
        const layer = new Layer(Object.assign(Object.assign({}, props), { clip: this }));
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
            var f = modWrap(frame, layer.totalFrames);
            if (layer.totalFrames >= f) {
                this.library.scene.draw(layer, frame, lerp, callback);
            }
        }
    }
}
