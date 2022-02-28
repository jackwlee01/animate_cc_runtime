"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
const Clip_1 = require("./Clip");
const Vec2_1 = require("./geom/Vec2");
const Sprite_1 = require("./Sprite");
const Atlas_1 = require("./Atlas");
const utilJson_1 = require("./json/utilJson");
const Matrix_1 = require("./geom/Matrix");
const createImage_1 = require("./util/createImage");
class Library {
    constructor(name, path, scene) {
        this.clips = [];
        this.clipsByName = {};
        this.spritesByName = {};
        this.atlases = [];
        this.atlasesBySpriteName = {};
        this.name = name;
        this.path = path;
        this.atlases = [];
        this.scene = scene;
    }
    symbol(name) {
        if (this.clipsByName[name])
            return this.clipsByName[name];
        if (this.spritesByName[name])
            return this.spritesByName[name];
        throw ("Cannot find symbol: " + name + " for library: " + this.path);
    }
    createAtlas(props, pixelData) {
        const atlas = new Atlas_1.Atlas(Object.assign(Object.assign({}, props), { library: this, pixelData }));
        this.atlases.push(atlas);
        return atlas;
    }
    createSprite(atlas, props) {
        const sprite = new Sprite_1.Sprite(Object.assign(Object.assign({}, props), { atlas: atlas }));
        atlas.sprites.push(sprite);
        this.spritesByName[sprite.name] = sprite;
        this.atlasesBySpriteName[sprite.name] = atlas;
        return sprite;
    }
    createClip(props) {
        const clip = new Clip_1.Clip(Object.assign(Object.assign({}, props), { library: this }));
        this.clips.push(clip);
        this.clipsByName[clip.name] = clip;
        return clip;
    }
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            const animJsonPath = this.path + "/Animation.json";
            const animFetchResult = yield fetch(animJsonPath);
            const dataRaw = yield animFetchResult.json();
            const data = (0, utilJson_1.normaliseJson)(dataRaw);
            const spriteNames = [];
            // Clip
            for (const symbolData of data.symbolDictionary.symbols) {
                const clip = this.createClip({
                    name: symbolData.symbolName,
                });
                // Layer
                for (let l = symbolData.timeline.layers.length - 1; l >= 0; l--) {
                    const layerData = symbolData.timeline.layers[l];
                    const layer = clip.createLayer({
                        name: layerData.layerName,
                        type: layerData.layerType || 'Normal',
                        clippedBy: layerData.clippedBy || null,
                    });
                    // Frame
                    for (const frameData of layerData.frames) {
                        const frame = layer.createFrame({
                            name: "" + frameData.index,
                            totalFrames: frameData.duration,
                            labelName: frameData.name,
                            index: frameData.index,
                        });
                        // Element
                        for (const elemInstanceData of frameData.elements) {
                            if ("symbolInstance" in elemInstanceData) {
                                const elemData = elemInstanceData.symbolInstance;
                                const m = elemData.matrix3D;
                                const instanceProps = {
                                    frame,
                                    name: frame.name,
                                    filters: elemData.filters || null,
                                    matrix: 'm00' in m ? new Matrix_1.Matrix(m.m00, m.m01, m.m02, m.m03, m.m10, m.m11, m.m12, m.m13, m.m20, m.m21, m.m22, m.m23, m.m30, m.m31, m.m32, m.m33)
                                        : new Matrix_1.Matrix(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]),
                                    itemName: elemData.symbolName,
                                    color: elemData.color || null,
                                    //position: new Vec3(elemData.decomposedMatrix.position),
                                    //scale: new Vec3(elemData.decomposedMatrix.scaling),
                                    //rotation: new Vec3(elemData.decomposedMatrix.rotation),
                                };
                                const clipInstance = frame.createClipInstance(Object.assign(Object.assign({}, instanceProps), { transformationPoint: new Vec2_1.Vec2(elemData.transformationPoint), behaviour: elemData.symbolType == "graphic"
                                        ? { type: 'graphic', loop: elemData.loop, firstFrame: elemData.firstFrame }
                                        : { type: 'movieclip' } }));
                            }
                            else {
                                const elemData = elemInstanceData.atlasSpriteInstance;
                                const m = elemData.matrix3D;
                                const spriteInstance = frame.createSpriteInstance({
                                    name: frame.name,
                                    filters: elemData.filters || null,
                                    color: null,
                                    matrix: 'm00' in m ? new Matrix_1.Matrix(m.m00, m.m01, m.m02, m.m03, m.m10, m.m11, m.m12, m.m13, m.m20, m.m21, m.m22, m.m23, m.m30, m.m31, m.m32, m.m33)
                                        : new Matrix_1.Matrix(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]),
                                    itemName: elemData.name,
                                    //position: new Vec3(elemData.decomposedMatrix.position),
                                    //scale: new Vec3(elemData.decomposedMatrix.scaling),
                                    //rotation: new Vec3(elemData.decomposedMatrix.rotation),
                                });
                                if (spriteNames.indexOf(spriteInstance.itemName) == -1)
                                    spriteNames.push(spriteInstance.itemName);
                            }
                        }
                    }
                }
            }
            ;
            // Sprites
            let pendingAtlasIndex = 1;
            for (const spriteName of spriteNames) {
                if (this.atlasesBySpriteName[spriteName] == null) {
                    const spriteJsonPath = this.path + `/spritemap${pendingAtlasIndex}.json`;
                    const altasFetch = yield fetch(spriteJsonPath);
                    const dataRaw = yield altasFetch.json();
                    const data = (0, utilJson_1.normaliseJson)(dataRaw);
                    const imagePath = this.path + `/spritemap${pendingAtlasIndex}.png`;
                    const image = yield (0, createImage_1.createImage)(imagePath); // TODO: This will impact load times. Find a way to make this load parallel. Workers?
                    const atlas = this.createAtlas({
                        image,
                        app: data.meta.app,
                        version: data.meta.version,
                        imagePath: data.meta.image,
                        format: data.meta.format,
                        size: data.meta.size,
                        resolution: data.meta.resolution,
                    }, this.scene.getPixelData(image));
                    for (const spriteSpriteData of data.atlas.sprites) {
                        const spriteData = spriteSpriteData.sprite;
                        const sprite = this.createSprite(atlas, {
                            name: spriteData.name,
                            x: spriteData.x,
                            y: spriteData.y,
                            width: spriteData.w,
                            height: spriteData.h,
                            rotated: spriteData.rotated,
                        });
                        this.atlasesBySpriteName[sprite.name] = atlas;
                    }
                    pendingAtlasIndex++;
                }
            }
        });
    }
}
exports.Library = Library;
