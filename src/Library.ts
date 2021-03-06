import { JsonAnimationData, JsonLibrarySymbol } from "./json/AnimationJson";
import { Clip, ClipProps } from "./Clip";
import { Vec2 } from "./geom/Vec2";
import { InstanceProps } from "./Instance";
import { Sprite, SpriteProps } from "./Sprite";
import { Atlas, AtlasProps } from "./Atlas";
import { normaliseJson } from "./json/utilJson";
import { Scene } from "./Scene";
import { Matrix } from "./geom/Matrix";
import { JsonSpriteMap } from "./json/SpritemapJson"
import { createImage } from "./util/createImage";


export class Library{

    name:string;
    path:string;
    clips:Array<Clip> = [];
    clipsByName:Record<string, Clip> = {};
    spritesByName:Record<string, Sprite> = {};
    atlases:Array<Atlas> = [];
    atlasesBySpriteName:Record<string, Atlas> = {}
    scene:Scene;
    exportedName:string|null;
    loaded = false;
    
    
    constructor(name:string, path:string, scene:Scene){
        this.name = name
        this.path = path
        this.atlases = []
        this.scene = scene
        this.exportedName = null
        this.loaded = false
    }


    get exported(){
        if(!this.exportedName) throw("Not yet loaded")
        return this.clipsByName[this.exportedName]
    }


    symbol(name:string){
        if(this.clipsByName[name]) return this.clipsByName[name]
        if(this.spritesByName[name]) return this.spritesByName[name]
        throw("Cannot find symbol: " + name + " for library: " + this.path);
    }


    createAtlas(props:Omit<AtlasProps, 'library'|'pixelData'>, pixelData:ReturnType<Scene['getPixelData']>){
        const atlas = new Atlas({...props, library:this, pixelData});
        this.atlases.push(atlas);
        return atlas;
    }


    createSprite(atlas:Atlas, props:Omit<SpriteProps, 'atlas'>){
        const sprite = new Sprite({...props, atlas:atlas})
        atlas.sprites.push(sprite);
        this.spritesByName[sprite.name] = sprite;
        this.atlasesBySpriteName[sprite.name] = atlas;
        return sprite;
    }


    createClip(props:Omit<ClipProps, 'library'>){
        const clip = new Clip({...props, library:this});
        this.clips.push(clip)
        this.clipsByName[clip.name] = clip
        return clip;
    }




    public async loadData(){
        if(this.loaded) throw("Already loaded: " + this.name + " " + this.path)

        const animJsonPath = this.path + "/Animation.json";
        const animFetchResult = await fetch(animJsonPath);
        const dataRaw:JsonAnimationData = await animFetchResult.json();
        const data = normaliseJson(dataRaw) as JsonAnimationData;
        const spriteNames:Array<string> = [];
        this.exportedName = data.animation.symbolName


        const generateClip =(symbolData:JsonLibrarySymbol) => {
            const clip = this.createClip({
                name: symbolData.symbolName,
            })
    
            // Layer
            for(let l=symbolData.timeline.layers.length-1; l>=0; l--){
                const layerData = symbolData.timeline.layers[l]
                const layer = clip.createLayer({
                    name: layerData.layerName,
                    type: layerData.layerType || 'Normal',
                    clippedBy: layerData.clippedBy || null,
                })
    
                // Frame
                for(const frameData of layerData.frames){
                    const frame = layer.createFrame({
                        name: ""+frameData.index,
                        totalFrames: frameData.duration,
                        labelName: frameData.name,
                        index: frameData.index,
                    })
    
                    // Element
                    for(const elemInstanceData of  frameData.elements){
                        if("symbolInstance" in elemInstanceData){
                            const elemData = elemInstanceData.symbolInstance;
                            const m = elemData.matrix3D;
    
                            const instanceProps:Omit<InstanceProps, 'totalFrames'>  = {
                                frame,
                                name: frame.name,
                                filters: elemData.filters || null,
                                matrix: 'm00' in m ? new Matrix(m.m00, m.m01, m.m02, m.m03,
                                                                    m.m10, m.m11, m.m12, m.m13,
                                                                    m.m20, m.m21, m.m22, m.m23,
                                                                    m.m30, m.m31, m.m32, m.m33)
                                                     : new Matrix(m[ 0], m[ 1], m[ 2], m[ 3],
                                                                    m[ 4], m[ 5], m[ 6], m[ 7],
                                                                    m[ 8], m[ 9], m[10], m[11],
                                                                    m[12], m[13], m[14], m[15]),
                                itemName: elemData.symbolName,
                                color: elemData.color || null,
                                //position: new Vec3(elemData.decomposedMatrix.position),
                                //scale: new Vec3(elemData.decomposedMatrix.scaling),
                                //rotation: new Vec3(elemData.decomposedMatrix.rotation),
                            }
    
                            const clipInstance = frame.createClipInstance({
                                ...instanceProps,
                                transformationPoint: new Vec2(elemData.transformationPoint),
                                behaviour: elemData.symbolType == "graphic"
                                         ? { type: 'graphic', loop: elemData.loop, firstFrame: elemData.firstFrame}
                                         : { type: 'movieclip' }
                            })
                        }else{
                            const elemData = elemInstanceData.atlasSpriteInstance;
                            const m = elemData.matrix3D;
    
                            const spriteInstance = frame.createSpriteInstance({
                                name: frame.name,
                                filters: elemData.filters || null,
                                color: null,
                                matrix: 'm00' in m ? new Matrix(m.m00, m.m01, m.m02, m.m03,
                                                                    m.m10, m.m11, m.m12, m.m13,
                                                                    m.m20, m.m21, m.m22, m.m23,
                                                                    m.m30, m.m31, m.m32, m.m33)
                                                     : new Matrix(m[ 0], m[ 1], m[ 2], m[ 3],
                                                                    m[ 4], m[ 5], m[ 6], m[ 7],
                                                                    m[ 8], m[ 9], m[10], m[11],
                                                                    m[12], m[13], m[14], m[15]),
                                itemName: elemData.name,
                                //position: new Vec3(elemData.decomposedMatrix.position),
                                //scale: new Vec3(elemData.decomposedMatrix.scaling),
                                //rotation: new Vec3(elemData.decomposedMatrix.rotation),
                            })
    
                            if(spriteNames.indexOf(spriteInstance.itemName)==-1) spriteNames.push(spriteInstance.itemName)
                        }
                    }
                }
            }
        }

        // Export Clip
        generateClip(data.animation)

        // Clip
        for(const symbolData of data.symbolDictionary.symbols){
            generateClip(symbolData)
        };

        // Sprites
        let pendingAtlasIndex = 1;
        for(const spriteName of spriteNames){
            if(this.atlasesBySpriteName[spriteName]==null){
                const spriteJsonPath = this.path + `/spritemap${pendingAtlasIndex}.json`;
                const altasFetch = await fetch(spriteJsonPath);
                const dataRaw:JsonSpriteMap = await altasFetch.json();
                const data = normaliseJson(dataRaw) as JsonSpriteMap;

                const imagePath = this.path + `/spritemap${pendingAtlasIndex}.png`;
                const image = await createImage(imagePath) // TODO: This will impact load times. Find a way to make this load parallel. Workers?

                
                const atlas = this.createAtlas({
                    image,
                    app: data.meta.app,
                    version: data.meta.version,
                    imagePath: data.meta.image,
                    format: data.meta.format,
                    size: data.meta.size,
                    resolution: data.meta.resolution ,
                }, this.scene.getPixelData(image),)
                for(const spriteSpriteData of data.atlas.sprites){
                    const spriteData = spriteSpriteData.sprite;
                    const sprite = this.createSprite(atlas, {
                        name: spriteData.name,
                        x: spriteData.x,
                        y: spriteData.y,
                        width: spriteData.w,
                        height: spriteData.h,
                        rotated: spriteData.rotated,
                    })
                    this.atlasesBySpriteName[sprite.name] = atlas;
                }


                pendingAtlasIndex++;
            }
        }

        this.loaded = true
    }


}
