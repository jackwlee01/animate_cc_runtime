import { Clip, ClipProps } from "./Clip";
import { Sprite, SpriteProps } from "./Sprite";
import { Atlas, AtlasProps } from "./Atlas";
import { Scene } from "./Scene";
export declare class Library {
    name: string;
    path: string;
    clips: Array<Clip>;
    clipsByName: Record<string, Clip>;
    spritesByName: Record<string, Sprite>;
    atlases: Array<Atlas>;
    atlasesBySpriteName: Record<string, Atlas>;
    scene: Scene;
    exportedName: string | null;
    loaded: boolean;
    constructor(name: string, path: string, scene: Scene);
    get exported(): Clip;
    symbol(name: string): Sprite | Clip;
    createAtlas(props: Omit<AtlasProps, 'library' | 'pixelData'>, pixelData: ReturnType<Scene['getPixelData']>): Atlas;
    createSprite(atlas: Atlas, props: Omit<SpriteProps, 'atlas'>): Sprite;
    createClip(props: Omit<ClipProps, 'library'>): Clip;
    loadData(): Promise<void>;
}
//# sourceMappingURL=Library.d.ts.map