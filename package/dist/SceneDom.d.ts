import { Scene } from "./Scene";
import { Drawable } from "./Drawable";
import { Instance } from "./Instance";
import { Float } from "./types/Float";
export declare class SceneDom extends Scene {
    elemId: string;
    elems: Array<HTMLElement>;
    stack: Array<HTMLElement>;
    constructor(elemId: string);
    get current(): HTMLDivElement;
    pushElem(type: string, name: string, id: string): void;
    pop(): void;
    get container(): HTMLDivElement;
    clear(): void;
    draw: (item: Drawable, frame: Float, lerp?: boolean | undefined, callback?: ((item: Drawable, frame: Float, lerp?: boolean | undefined) => void) | undefined) => void;
    pushTranslate(x: string, y: string): void;
    pushScale(x: string, y: string): void;
    pushRotation(z: string): void;
    transformInstance(item: Instance, frame: Float, lerp?: boolean): void;
}
//# sourceMappingURL=SceneDom.d.ts.map