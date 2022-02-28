import { Drawable } from "./Drawable";
import { Vec2 } from "./geom/Vec2";
import { Instance } from "./Instance";
import { InstanceProps } from "./Instance";
import { Float } from "./types/Float";
declare type LoopKind = 'loop';
declare type ClipInstanceBehavior = {
    type: 'graphic';
    loop: LoopKind;
    firstFrame: Float;
} | {
    type: 'movieclip';
};
export declare type ClipInstanceProps = InstanceProps & {
    transformationPoint?: Vec2;
    behaviour?: ClipInstanceBehavior;
};
export declare class ClipInstance extends Instance {
    transformationPoint: Vec2;
    behaviour: ClipInstanceBehavior;
    constructor(props: ClipInstanceProps);
    get item(): import("./Clip").Clip;
    draw(frame: Float, lerp?: boolean, callback?: (item: Drawable, frame: Float, lerp?: boolean) => void): void;
}
export {};
//# sourceMappingURL=ClipInstance.d.ts.map