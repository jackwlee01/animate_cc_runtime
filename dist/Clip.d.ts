import { Drawable } from "./Drawable";
import { Frame } from "./Frame";
import { Layer, LayerProps } from "./Layer";
import { DrawableProps } from './Drawable';
import { Float } from "./types/Float";
export declare type ClipProps = Omit<DrawableProps, 'totalFrames' | 'id'>;
export declare class Clip extends Drawable {
    layers: Array<Layer>;
    layersById: Record<string, Layer>;
    layersByName: Record<string, Layer>;
    framesById: Record<string, Frame>;
    framesByLabel: Record<string, Frame>;
    constructor(props: ClipProps);
    createLayer(props: Omit<LayerProps, 'clip'>): Layer;
    __addFrame(frame: Frame): void;
    draw(frame: Float, lerp?: boolean, callback?: (item: Drawable, frame: Float, lerp?: boolean) => void): void;
}
//# sourceMappingURL=Clip.d.ts.map