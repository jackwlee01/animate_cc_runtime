import { Drawable, isAtlasSpriteInstance, isKeyframe, isLayer, isSprite, isSymbol, isSymbolInstance, visit } from ".";
import { AnimationJson } from "./json/AnimationJson";
import { normaliseJson } from "./json/utilJson";


async function getJsonData(path:string){
    const res = await fetch(path)
    return await res.json();
}


async function init(){
    const rawAnim:AnimationJson = await getJsonData('./anims/Animation.json')
    const spriteMap:SpriteMapJson = await getJsonData('./anims/spritemap1.json')
    const anim = normaliseJson(rawAnim)
    console.log(anim)
}


function drawbase(anims:AnimationJson, sprites:SpriteMapJson, drawable:Drawable, frame:number):void{
    if(isSymbol(drawable)){
        visit(anims, sprites, drawable, frame, drawbase);
    }else if(isLayer(drawable)){
        visit(anims, sprites, drawable, frame, drawbase);
    }else if(isKeyframe(drawable)){
        visit(anims, sprites, drawable, frame, drawbase);
    }else if(isSymbolInstance(drawable)){
        visit(anims, sprites, drawable, frame, drawbase);
    }else if(isAtlasSpriteInstance(drawable)){
        visit(anims, sprites, drawable, frame, drawbase);
    }else if(isSprite(drawable)){
        visit(anims, sprites, drawable, frame, drawbase);
    }
}


init();

console.log("Heysdf")