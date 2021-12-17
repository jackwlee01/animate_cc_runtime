const keys:Record<string, string> = {
    // fix inconsistent names
    ANIMATION: "animation",
    ATLAS_SPRITE_instance: "atlasSpriteInstance",
    DecomposedMatrix: "decomposedMatrix",
    Frames: "frames",
    framerate: "frameRate",
    Instance_Name: "instanceName",
    Layer_name: "layerName",
    LAYERS: "layers",
    Matrix3D: "matrix3D",
    Position: "position",
    Rotation: "rotation",
    Scaling: "scaling",
    SYMBOL_DICTIONARY: "symbolDictionary",
    SYMBOL_Instance: "symbolInstance",
    SYMBOL_name: "symbolName",
    Symbols: "symbols",
    TIMELINE: "timeline",

    SPRITE: "sprite",
    SPRITES: "sprites",
    ATLAS: "atlas",

    /* Not yet supported
    // fix shortened names

    AN: "animation",
    AM: "alphaMultiplier",
    ASI: "atlasSpriteInstance",
    BM: "bitmap",
    C: "color",
    DU: "duration",
    E: "elements",
    FF: "firstFrame",
    FR: "frames",
    FRT: "frameRate",
    I: "index",
    IN: "instanceName",
    L: "layers",
    LN: "layerName",
    LP: "loop",
    M3D: "matrix3D",
    MD: "metadata",
    M: "mode",
    N: "name",
    POS: "position",
    S: "symbols",
    SD: "symbolDictionary",
    SI: "symbolInstance",
    SN: "symbolName",
    ST: "symbolType",
    TL: "timeline",
    TRP: "transformationPoint"
    */
};


function normaliseKey(key:string){
    return keys[key] || key;
}


// AnimateCC exports wildy inconsistent JSON. Normalise the
// fields to make it easier to work with
export function normaliseJson(data:any):any{
    if(typeof data == "string" || typeof data == "number")
    switch(typeof data){
        case "bigint": throw("Not supported");
        case "function": throw("Not supported");
        case "symbol": throw("Not supported");
        case "undefined": throw("Not supported");
        case "string": return data;
        case "number": return data;
        case "boolean": return data;
        case "object":
            if(Array.isArray(data)){
                return (data as Array<any>).map(normaliseJson);
            }else{
                var result:any = {};
                Object.keys(data).forEach(key => result[normaliseKey(key)] = normaliseJson(data[key]));
                return result;
            }
    }
}
