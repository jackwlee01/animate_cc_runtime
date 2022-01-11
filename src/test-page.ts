import { Drawable, drawableType, isAtlasSpriteInstance, isKeyframe, isLayer, isSprite, isSymbol, isSymbolInstance, visit } from ".";
import { AnimationJson } from "./json/AnimationJson";
import { normaliseJson } from "./json/utilJson";


const canvas = document.getElementById("canvas") as HTMLCanvasElement
const buffer = canvas.getContext('2d')!
buffer.imageSmoothingEnabled = true;
buffer.imageSmoothingQuality = 'high'
//setupCanvas(canvas)

function setupCanvas(canvas:HTMLCanvasElement) {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext('2d')!;
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    console.log(dpr)
    return ctx;
}


async function getJsonData(path:string){
    const res = await fetch(path)
    return await res.json();
}


async function init(){
    const rawAnim:AnimationJson = await getJsonData('./anims/Animation.json')
    const spriteMapRaw:SpriteMapJson = await getJsonData('./anims/spritemap1.json')
    const anim = normaliseJson(rawAnim) as AnimationJson
    const spriteMap = normaliseJson(spriteMapRaw) as SpriteMapJson

    const img = new Image();
    img.src = './anims/spritemap1.png'

    //document.body.appendChild(img)


    

    var frame = 0;

    function update(){
        buffer.clearRect(0, 0, canvas.width, canvas.height)

        buffer.save();
        buffer.scale(0.5, 0.5)
        buffer.translate(canvas.width/2, canvas.height/2)

        var symbol = anim.symbolDictionary.symbols.find(symbol => symbol.symbolName=="Anim_TestAnim")!
        
        visit(anim, spriteMap, symbol, frame, drawbase);
        
        function drawbase(anims:AnimationJson, sprites:SpriteMapJson, drawable:Drawable, frame:number):void{
            if(isSymbol(drawable)){
                visit(anims, sprites, drawable, frame, drawbase);
            }else if(isLayer(drawable)){
                visit(anims, sprites, drawable, frame, drawbase);
            }else if(isKeyframe(drawable)){
                visit(anims, sprites, drawable, frame, drawbase);
            }else if(isSymbolInstance(drawable) || isAtlasSpriteInstance(drawable)){
                const m = drawable.matrix3D;
                buffer.save()
                if(isSymbolInstance(drawable) && drawable.color) buffer.globalAlpha *= drawable.color.alphaMultiplier;
                buffer.transform(m.m00, m.m01, m.m10, m.m11, m.m30, m.m31);
                visit(anims, sprites, drawable, frame, drawbase);
                buffer.restore();
            }else if(isSprite(drawable)){
                buffer.fillStyle = 'rgba(0, 0, 0, 0.2)'
                buffer.drawImage(img, drawable.x, drawable.y, drawable.w, drawable.h, 0, 0, drawable.w, drawable.h)
            }
        }
        frame+=0.5;
        
        buffer.restore();
        requestAnimationFrame(update)
    }
    update();
}

init();
