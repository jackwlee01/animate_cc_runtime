import { Library } from "./Library";
import { Float } from "./types/Float";
import { Int } from "./types/Int";
export declare type DrawableProps = {
    name: string;
    id: string;
    totalFrames: Int;
    library: Library;
};
export declare abstract class Drawable {
    name: string;
    id: string;
    totalFrames: Int;
    library: Library;
    constructor(props: DrawableProps);
    get scene(): import("./Scene").Scene;
    draw(frame: Float, lerp?: boolean, callback?: (item: Drawable, frame: Float, lerp?: boolean) => void): void;
}
//# sourceMappingURL=Drawable.d.ts.map