import { AnimationJson } from "./json/AnimationJson";
import { Clip, ClipProps } from "./Clip";
import { ClipInstanceProps } from "./ClipInstance";
import { SpriteInstanceProps } from "./SpriteInstance";
import { Vec3 } from "./geom/Vec3";
import { Vec2 } from "./geom/Vec2";
import { Matrix2d } from "./geom/Matrix2d";
import { InstanceProps } from "./Instance";
import { DrawableProps } from "./Drawable";
import { Sprite, SpriteProps } from "./Sprite";
import { Atlas, AtlasProps } from "./Atlas";
import { normaliseJson } from "./json/utilJson";
import { AnimationContext } from "./AnimationContext";


export class Library{

    name:string;
    path:string;
    clips:Array<Clip> = [];
    clipsByName:Record<string, Clip> = {};
    spritesByName:Record<string, Sprite> = {};
    atlases:Array<Atlas> = [];
    atlasesBySpriteName:Record<string, Atlas> = {}
    context:AnimationContext;
    
    
    constructor(name:string, path:string, context:AnimationContext){
        this.name = name;
        this.path = path;
        this.atlases = [];
        this.context = context;
    }


    symbol(name:string){
        if(this.clipsByName[name]) return this.clipsByName[name]
        if(this.spritesByName[name]) return this.spritesByName[name]
        throw("Cannot find symbol: " + name + " for library: " + this.path);
    }


    createAtlas(props:Omit<AtlasProps, 'library'>){
        const atlas = new Atlas({...props, library:this});
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
        const animJsonPath = this.path + "/Animation.json";
        const animFetchResult = await fetch(animJsonPath);
        const dataRaw:AnimationJson = await animFetchResult.json();
        const data = normaliseJson(dataRaw) as AnimationJson;
        const spriteNames:Array<string> = [];

        // Clip
        for(const symbolData of data.symbolDictionary.symbols){
            const clip = this.createClip({
                name: symbolData.symbolName,
            })

            // Layer
            for(let l=symbolData.timeline.layers.length-1; l>=0; l--){
                const layerData = symbolData.timeline.layers[l]
                const layer = clip.createLayer({
                    name: layerData.layerName,
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
                            type _DrawableProps = Pick<DrawableProps, keyof DrawableProps & keyof ClipInstanceProps>;
                            type _InstanceProps = Omit<InstanceProps, keyof DrawableProps>
                            
                            const elemData = elemInstanceData.symbolInstance;
                            const m = elemData.matrix3D;

                            const drawableProps:_DrawableProps = {
                                name: frame.name,
                                totalFrames: frame.totalFrames,
                            }

                            const instanceProps:_InstanceProps  = {
                                frame,
                                matrix2d: 'm00' in m ? new Matrix2d(m.m00, m.m01, m.m10, m.m11, m.m30, m.m31) : new Matrix2d(m[0], m[1], m[4], m[5], m[12], m[13]),
                                itemName: elemData.symbolName,
                                //position: new Vec3(elemData.decomposedMatrix.position),
                                //scale: new Vec3(elemData.decomposedMatrix.scaling),
                                //rotation: new Vec3(elemData.decomposedMatrix.rotation),
                            }

                            const clipInstance = frame.createClipInstance({
                                ...drawableProps,
                                ...instanceProps,
                                transformationPoint: new Vec2(elemData.transformationPoint),
                                behaviour: elemData.symbolType == "graphic"
                                         ? { type: 'graphic', loop: elemData.loop, firstFrame: elemData.firstFrame}
                                         : { type: 'movieclip' }
                            })
                        }else{
                            type _DrawableProps = Pick<DrawableProps, keyof DrawableProps & keyof SpriteInstanceProps>;
                            type _InstanceProps = Omit<InstanceProps, keyof DrawableProps>
                            
                            const elemData = elemInstanceData.atlasSpriteInstance;
                            const m = elemData.matrix3D;

                            const drawableProps:_DrawableProps = {
                                name: frame.name,
                                totalFrames: frame.totalFrames,
                            }

                            const instanceProps:_InstanceProps  = {
                                frame,
                                matrix2d: 'm00' in m ? new Matrix2d(m.m00, m.m01, m.m10, m.m11, m.m30, m.m31) : new Matrix2d(m[0], m[1], m[4], m[5], m[12], m[13]),
                                itemName: elemData.name,
                                //position: new Vec3(elemData.decomposedMatrix.position),
                                //scale: new Vec3(elemData.decomposedMatrix.scaling),
                                //rotation: new Vec3(elemData.decomposedMatrix.rotation),
                            }

                            const spriteInstance = frame.createSpriteInstance({
                                ...drawableProps,
                                ...instanceProps,
                            })

                            if(spriteNames.indexOf(spriteInstance.itemName)==-1) spriteNames.push(spriteInstance.itemName)
                        }
                    }
                }
            }
        };

        // Sprites
        let pendingAtlasIndex = 1;
        for(const spriteName of spriteNames){
            if(this.atlasesBySpriteName[spriteName]==null){
                const spriteJsonPath = this.path + `/spritemap${pendingAtlasIndex}.json`;
                const altasFetch = await fetch(spriteJsonPath);
                const dataRaw:SpriteMapJson = await altasFetch.json();
                const data = normaliseJson(dataRaw) as SpriteMapJson;

                const image = new Image(data.meta.size.w, data.meta.size.h);
                image.src = this.path + `/spritemap${pendingAtlasIndex}.png`;

                
                const atlas = this.createAtlas({
                    image,
                    app: data.meta.app,
                    version: data.meta.version,
                    imagePath: data.meta.image,
                    format: data.meta.format,
                    size: data.meta.size,
                    resolution: data.meta.resolution 
                })
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

    }


}
