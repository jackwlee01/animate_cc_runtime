import { Float } from "../types/Float";
declare type JsonSprite = {
    name: string;
    x: Float;
    y: Float;
    w: Float;
    h: Float;
    rotated: boolean;
};
declare type JsonAtlas = {
    sprites: Array<{
        sprite: JsonSprite;
    }>;
};
declare type JsonSize = {
    w: Float;
    h: Float;
};
declare type JsonMeta = {
    app: string;
    version: string;
    image: string;
    format: string;
    size: JsonSize;
    resolution: string;
};
export declare type JsonSpriteMap = {
    atlas: JsonAtlas;
    meta: JsonMeta;
};
export {};
//# sourceMappingURL=SpritemapJson.d.ts.map