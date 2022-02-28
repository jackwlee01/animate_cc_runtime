import { Drawable } from "./Drawable";
import { Library } from "./Library";
import { Float } from "./types/Float";
export declare class Scene {
    draw: (item: Drawable, frame: Float, lerp?: boolean, callback?: (item: Drawable, frame: Float, lerp?: boolean) => void) => void;
    drawImage: (image: HTMLImageElement, sx: number, sy: number, sw: number, sh: number, rx: number, ry: number, rw: number, rh: number) => void;
    pixelData: Record<string, {
        ctx: CanvasRenderingContext2D;
        imageData: ImageData;
        image: HTMLImageElement;
    }>;
    libraries: Record<string, Library>;
    constructor();
    get mouseX(): number;
    get mouseY(): number;
    createLibrary(name: string, path: string): Library;
    library(name: string): Library;
    getPixelData(image: HTMLImageElement): {
        ctx: CanvasRenderingContext2D;
        imageData: ImageData;
        image: HTMLImageElement;
    };
}
//# sourceMappingURL=Scene.d.ts.map