import { Clip } from "./Clip";
import { Drawable } from "./Drawable";
import { Frame, FrameProps } from "./Frame";
import { DrawableProps } from "./Drawable";
import { Int } from "./types/Int";
import { Float } from "./types/Float";
export declare type LayerProps = Omit<DrawableProps, 'totalFrames' | 'id' | 'library'> & {
    clip: Clip;
    type: 'Normal' | 'Clipper';
    clippedBy?: string | null;
};
export declare class Layer extends Drawable {
    index: Int;
    type: LayerProps['type'];
    clippedBy: string | null;
    frames: Array<Frame>;
    framesByName: Record<string, Frame>;
    labels: Array<Frame>;
    clip: Clip;
    constructor(props: LayerProps);
    createFrame(props: Omit<FrameProps, 'layer'>): Frame;
    get lastFrame(): Frame;
    get firstFrame(): Frame;
    keyframeAt(frame: Float): Frame | null;
    draw(frame: Float, lerp?: boolean, callback?: (item: Drawable, frame: Float, lerp?: boolean) => void): void;
}
//# sourceMappingURL=Layer.d.ts.map