import { Scene } from "./Scene";
import { Drawable } from "./Drawable";
import { Float } from "./types/Float";
export declare class SceneCanvas2d extends Scene {
    canvas: HTMLCanvasElement;
    stack: CanvasRenderingContext2D[];
    pool: CanvasRenderingContext2D[];
    private _mouseX;
    private _mouseY;
    constructor(ctx: CanvasRenderingContext2D);
    onMouseMove(e: MouseEvent): void;
    get mouseX(): number;
    get mouseY(): number;
    getLocal(x: number, y: number): DOMPoint;
    get ctx(): CanvasRenderingContext2D;
    pushRenderTarget(): void;
    popRenderTarget(): void;
    draw: (item: Drawable, frame: Float, lerp?: boolean | undefined, callback?: ((item: Drawable, frame: Float, lerp?: boolean | undefined) => void) | undefined) => void;
    drawImage: (image: HTMLImageElement, sx: number, sy: number, sw: number, sh: number, rx: number, ry: number, rw: number, rh: number) => void;
    private handleColor;
    private handleFilters;
    pushDropShadow(color: string, blur: number, offsetX?: Float, offsetY?: Float): void;
    popDropShadow(): void;
    private transformInstance;
}
//# sourceMappingURL=SceneCanvas2d.d.ts.map