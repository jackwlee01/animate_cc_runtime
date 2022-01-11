import { AnimationJson, AtlasSpriteInstance, Keyframe, Layer, LibrarySymbol, SymbolInstance } from "./json/AnimationJson";

export type Drawable = LibrarySymbol | Layer | Keyframe | SymbolInstance | AtlasSpriteInstance | Sprite;


export function drawableType(data:Drawable){
    if(isSymbol(data)) return "symbol" as const
    if(isSprite(data)) return "sprite" as const
    if(isLayer(data)) return "layer" as const
    if(isKeyframe(data)) return "frame" as const
    if(isAtlasSpriteInstance(data)) return "atlaseSpriteInstance" as const
    if(isSymbolInstance(data)) return "symbolInstance" as const
    throw("Invalid drawable type: ")
}

function totalFrames(item:LibrarySymbol|Layer|Keyframe):number{
    if(isSymbol(item)){
        var largest = 0;
        for(const l in item.timeline.layers){
            const layer = item.timeline.layers[l]
            var layerTotalFrame = totalFrames(layer)
            if(layerTotalFrame > largest) largest = layerTotalFrame 
        }
        return largest;
    }else if(isLayer(item)){
        var lastKeyframe = item.frames[item.frames.length-1]
        if(lastKeyframe!=null) return lastKeyframe.index + lastKeyframe.duration
        return 0
    }else if(isKeyframe(item)){
        return item.duration
    }
    throw("Invalid");
}


function keyframeAt(layer:Layer, frame:number):Keyframe|null{
    for(const f in layer.frames){
        const keyframe = layer.frames[f]
        if(keyframe.index<=frame && keyframe.index+keyframe.duration>frame) return keyframe;
    }
    return null;
}


function modWrap(a:number, b:number){
    return a - b * Math.floor(a/b);
}


export function visit<T>(item:T, anims:AnimationJson, sprites:SpriteMapJson, drawable:Drawable, frame:number, callback:(item:T, drawable:Drawable, frame:number)=>void){
    // Symbol
    if(isSymbol(drawable)){
        frame = modWrap(frame, totalFrames(drawable))
        for(let l=drawable.timeline.layers.length-1; l>=0; l--){
            const layer = drawable.timeline.layers[l]
            callback(item, layer, frame) 
        }

    // Layer
    }else if(isLayer(drawable)){
        const keyframe = keyframeAt(drawable, frame)
        if(keyframe!=null) callback(item, keyframe, frame)

    //Keyframe
    }else if(isKeyframe(drawable)){
        for(const e in drawable.elements){
            const elem = drawable.elements[e]
            if("atlasSpriteInstance" in elem){
                callback(item, elem.atlasSpriteInstance, frame)
            }else if("symbolInstance" in elem){
                callback(item, elem.symbolInstance, frame)
            }else{
                throw("Invalid instance type")
            }
        }
    
    // SymbolInstance
    }else if(isSymbolInstance(drawable)){
        for(const s in anims.symbolDictionary.symbols){
            const symbol = anims.symbolDictionary.symbols[s]
            if(symbol.symbolName == drawable.symbolName){
                callback(item, symbol, frame);
                return;
            }
        }
        throw("Could not find symbol: " + drawable.symbolName);

    // AtlasSpriteInstance
    }else if(isAtlasSpriteInstance(drawable)){
        for(const s in sprites.atlas.sprites){
            const sprite = sprites.atlas.sprites[s].sprite;
            if(drawable.name == sprite.name){
                callback(item, sprite, frame);
                return;
            }
        }
        throw("Could not find sprite: " + drawable.name);

    // Sprite
    }else if(isSprite(drawable)){

    }
}



export function isSymbol(data:Drawable):data is LibrarySymbol{
    return "symbolName" in data && "matrix3D" in data == false;
}


export function isLayer(data:Drawable):data is Layer{
    return "layerName" in data
}


export function isKeyframe(data:Drawable):data is Keyframe{
    return "index" in data
}


export function isSymbolInstance(data:Drawable):data is SymbolInstance{
    return "symbolName" in data && "matrix3D" in data
}


export function isAtlasSpriteInstance(data:Drawable):data is AtlasSpriteInstance{
    return "name" in data && "matrix3D" in data
}


export function isSprite(data:Drawable):data is Sprite{
    return "name" in data && "w" in data
}