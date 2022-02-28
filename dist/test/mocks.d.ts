import { Atlas } from "../Atlas";
import { Library } from "../Library";
import { Scene } from "../Scene";
export declare const mockImage: () => HTMLImageElement;
export declare const mockPixelData: () => {
    ctx: CanvasRenderingContext2D;
    imageData: ImageData;
    image: HTMLImageElement;
};
export declare const mockScene: () => Scene;
export declare const mockLib: () => Library;
export declare const mockClip: (name?: string | undefined) => import("../Clip").Clip;
export declare const mockLayer: (name?: string | undefined) => import("../Layer").Layer;
export declare const mockFrame: () => import("../Frame").Frame;
export declare const mockAtlas: (library?: Library | undefined) => Atlas;
export declare const mockSprite: (atlas: Atlas) => import("../Sprite").Sprite;
//# sourceMappingURL=mocks.d.ts.map