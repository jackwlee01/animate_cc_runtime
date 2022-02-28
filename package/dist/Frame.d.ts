import { ClipInstance, ClipInstanceProps } from "./ClipInstance";
import { Drawable } from "./Drawable";
import { Layer } from "./Layer";
import { SpriteInstance, SpriteInstanceProps } from "./SpriteInstance";
import { DrawableProps } from "./Drawable";
import { Int } from "./types/Int";
import { Float } from "./types/Float";
export declare type FrameProps = Omit<DrawableProps, 'id' | 'library'> & {
    index: Int;
    layer: Layer;
    labelName?: string | undefined | null;
};
export declare class Frame extends Drawable {
    index: number;
    labelName: string | null;
    layer: Layer;
    instances: Array<ClipInstance | SpriteInstance>;
    prev: Frame | undefined;
    next: Frame | undefined;
    constructor(props: FrameProps);
    createClipInstance(props: Omit<ClipInstanceProps, 'frame' | 'totalFrames'>): ClipInstance;
    createSpriteInstance(props: Omit<SpriteInstanceProps, 'frame' | 'totalFrames'>): SpriteInstance;
    draw(frame: Float, lerp?: boolean, callback?: (item: Drawable, frame: Float) => void): void;
}
//# sourceMappingURL=Frame.d.ts.map