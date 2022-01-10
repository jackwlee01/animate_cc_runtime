import { AnimationJson, Matrix3D } from "./json/AnimationJson";
import { Clip } from "./Clip";
import { Frame } from "./Frame";
import { Layer } from "./Layer";
import { Instance } from "./Instance";
import { ClipInstance } from "./ClipInstance";
import { SpriteInstance } from "./SpriteInstance";
import { Vec2, Vec3 } from "./geom";


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



    private async getAtlasFor(spriteName:string){

    }


    public async loadData(){
        var animJsonPath = this.path + "/Animation.json";
        var animFetchResult = await fetch(animJsonPath);
        var data:AnimationJson = await animFetchResult.json();

        // Symbol
        data.symbolDictionary.symbols.forEach(symbolData => {
            const clip = new Clip({
                library:this,
                name: `${this.name}.${ symbolData.symbolName}`,
                id: symbolData.symbolName,
            })

            // Layer
            symbolData.timeline.layers.forEach(layerData => {
                const layer = new Layer({
                    library:this,
                    clip,
                    name: layerData.layerName,
                    id: `${this.name}.${clip.name}.${layerData.layerName}`,
                })

                // Frame
                layerData.frames.forEach(frameData => {
                    const frame = new Frame({
                        library:this,
                        clip,
                        layer,
                        id: `${this.name}.${clip.name}.${layerData.layerName}.${frameData.index}`,
                        name: ""+frameData.index,
                        index: frameData.index,
                        totalFrames: frameData.duration,
                        labelName: frameData.name,
                    })

                    // Element
                    frameData.elements.forEach(elemInstanceData => {
                        const commonProps = {
                            name: frame.name,
                            id: `${this.name}.${clip.name}.${layerData.layerName}.${frameData.index}.${frame.instances.length}`,
                            totalFrames: frame.totalFrames,
                            library:this,
                            frame,
                        }

                        if("symbolInstance" in elemInstanceData){
                            const elemData = elemInstanceData.symbolInstance;
                            const instance = new ClipInstance({
                                ...commonProps,
                                //item: null//
                                matrix3d: elemData.matrix3D,
                                position: new Vec3(elemData.decomposedMatrix.position),
                                scale: new Vec3(elemData.decomposedMatrix.scaling),
                                rotation: new Vec3(elemData.decomposedMatrix.rotation),
                                transformationPoint: new Vec2(elemData.transformationPoint),
                                
                            })
                            frame.addInstance(instance);
                        }else{
                            const elemData = elemInstanceData.atlasSpriteInstance;
                            const instance = new SpriteInstance({
                                ...commonProps,
                                item: //
                            })
                            frame.addInstance(instance);
                        }
                    })

                    layer.addFrame(frame);
                })
                clip.addLayer(layer)
            })
        });
    }


}


function getMatrix3dArray(m:Matrix3D){

    ];
}

function getMatrix2dArray(m:Matrix3D){
    ];
}