import { Library } from "./Library";
import { Scene } from "./Scene";
import { Sprite } from "./Sprite";
import { Float } from "./types/Float";
export declare type AtlasProps = {
    library: Library;
    image: HTMLImageElement;
    app: string;
    version: string;
    imagePath: string;
    format: string;
    size: {
        w: Float;
        h: Float;
    };
    resolution: string;
    pixelData: ReturnType<Scene['getPixelData']>;
};
export declare class Atlas {
    library: Library;
    sprites: Array<Sprite>;
    image: HTMLImageElement;
    app: string;
    version: string;
    imagePath: string;
    format: string;
    size: {
        w: Float;
        h: Float;
    };
    resolution: string;
    pixelData: ReturnType<Scene['getPixelData']>;
    constructor(props: AtlasProps);
    getPixel(x: Float, y: Float): number[];
}
//# sourceMappingURL=Atlas.d.ts.map