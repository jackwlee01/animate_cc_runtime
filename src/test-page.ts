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

init();

console.log("Heysdf")