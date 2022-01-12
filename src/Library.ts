import { Drawable, isAtlasSpriteInstance, isKeyframe, isLayer, isSprite, isSymbol, isSymbolInstance, visit } from "./core";
import { AnimationJson } from "./core/json/AnimationJson";
import { normaliseJson } from "./core/json/utilJson";

type Awaited<T> = T extends PromiseLike<infer U> ? U : T

export type Library = Awaited<ReturnType<typeof createLibrary>>;


async function getJsonData(path:string){
    const res = await fetch(path)
    return await res.json();
}


export async function createLibrary(path:string){
    const rawAnim:AnimationJson = await getJsonData(`./${path}/Animation.json`)
    const spriteMapRaw:SpriteMapJson = await getJsonData(`./${path}/spritemap1.json`)
    const anims = normaliseJson(rawAnim) as AnimationJson
    const spriteMap = normaliseJson(spriteMapRaw) as SpriteMapJson

    const atlas = new Image();
    atlas.src = `./${path}/spritemap1.png`


    function draw(buffer:CanvasRenderingContext2D, symbolName:string, frame:number){
        if(symbolName==null) return;
        var symbol = anims.symbolDictionary.symbols.find(symbol => symbol.symbolName==symbolName)!
        visit(buffer, anims, spriteMap, symbol, frame, drawbase);
    }

    function drawbase(buffer:CanvasRenderingContext2D, drawable:Drawable, frame:number):void{
        if(isSymbol(drawable)){
            visit(buffer, anims, spriteMap, drawable, frame, drawbase);
        }else if(isLayer(drawable)){
            visit(buffer, anims, spriteMap, drawable, frame, drawbase);
        }else if(isKeyframe(drawable)){
            visit(buffer, anims, spriteMap, drawable, frame, drawbase);
        }else if(isSymbolInstance(drawable) || isAtlasSpriteInstance(drawable)){
            const m = drawable.matrix3D;
            buffer.save()
            if(isSymbolInstance(drawable) && drawable.color) buffer.globalAlpha *= drawable.color.alphaMultiplier;
            if(m!=null) buffer.transform(m.m00, m.m01, m.m10, m.m11, m.m30, m.m31);
            visit(buffer, anims, spriteMap, drawable, frame, drawbase);
            buffer.restore();
        }else if(isSprite(drawable)){
            buffer.drawImage(atlas, drawable.x, drawable.y, drawable.w, drawable.h, 0, 0, drawable.w, drawable.h)
        }
    }

    return {
        path,
        anims,
        spriteMap,
        atlas,
        draw,
    }
}
