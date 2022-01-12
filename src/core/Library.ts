import { AnimationJson } from "../json/AnimationJson";
import { Clip, ClipProps } from "./Clip";
import { ClipInstanceProps } from "./ClipInstance";
import { SpriteInstanceProps } from "./SpriteInstance";
import { Vec3 } from "./geom/Vec3";
import { Vec2 } from "./geom/Vec2";
import { Matrix2d } from "./geom/Matrix2d";
import { InstanceProps } from "./Instance";
import { DrawableProps } from "./Drawable";


export class Library{

    name:string;
    path:string;
    atlases:Array<Atlas> = [];
    clips:Array<Clip> = [];
    clipsByName:Record<string, Clip> = {};


    constructor(name:string, path:string){
        this.name = name;
        this.path = path;
        this.atlases = [];
    }


    createClip(props:Omit<ClipProps, 'library'>){
        const clip = new Clip({...props, library:this});

        return clip;
    }



    public async loadData(){
        var animJsonPath = this.path + "/Animation.json";
        var animFetchResult = await fetch(animJsonPath);
        var data:AnimationJson = await animFetchResult.json();

        // Symbol
        data.symbolDictionary.symbols.forEach(symbolData => {
            const clip = this.createClip({
                name: symbolData.symbolName,
            })

            // Layer
            symbolData.timeline.layers.forEach(layerData => {
                const layer = clip.createLayer({
                    name: layerData.layerName,
                })

                // Frame
                layerData.frames.forEach(frameData => {
                    const frame = layer.createFrame({
                        name: ""+frameData.index,
                        totalFrames: frameData.duration,
                        labelName: frameData.name,
                        index: frameData.index,
                    })

                    // Element
                    frameData.elements.forEach(elemInstanceData => {
                        
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
                                matrix2d: new Matrix2d(m.m00, m.m01, m.m10, m.m11, m.m30, m.m31),
                                position: new Vec3(elemData.decomposedMatrix.position),
                                scale: new Vec3(elemData.decomposedMatrix.scaling),
                                rotation: new Vec3(elemData.decomposedMatrix.rotation),
                                itemName: elemData.symbolName,
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
                                matrix2d: new Matrix2d(m.m00, m.m01, m.m10, m.m11, m.m30, m.m31),
                                position: new Vec3(elemData.decomposedMatrix.position),
                                scale: new Vec3(elemData.decomposedMatrix.scaling),
                                rotation: new Vec3(elemData.decomposedMatrix.rotation),
                                itemName: elemData.name,
                            }

                            const spriteInstance = frame.createSpriteInstance({
                                ...drawableProps,
                                ...instanceProps,
                            })

                        }
                    })

                })
            })
        });
    }


}
