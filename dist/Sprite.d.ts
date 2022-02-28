import { Drawable } from "./Drawable";
import { Atlas } from "./Atlas";
import { DrawableProps } from "./Drawable";
import { Float } from "./types/Float";
export declare type SpriteProps = Omit<DrawableProps, 'totalFrames' | 'library' | 'id'> & {
    x: Float;
    y: Float;
    width: Float;
    height: Float;
    rotated: boolean;
    atlas: Atlas;
};
export declare class Sprite extends Drawable {
    x: Float;
    y: Float;
    width: Float;
    height: Float;
    rotated: boolean;
    atlas: Atlas;
    constructor(props: SpriteProps);
    getPixel(x: Float, y: Float, transform: DOMMatrix): number[] | null;
    isSolidPixelAt(x: Float, y: Float, transform: DOMMatrix, alphaThreshold?: number): boolean | null;
    draw(frame: Float, lerp?: boolean, callback?: (item: Drawable, frame: Float, lerp?: boolean) => void): void;
}
//# sourceMappingURL=Sprite.d.ts.map