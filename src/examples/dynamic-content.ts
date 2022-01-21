import { setupCanvas } from "./example-utils";
import { Canvas2dAnimationContext } from "../Canvas2dAnimationContext";
import { Drawable } from "../core/Drawable";
import { Clip } from "../core/Clip";
import { Layer } from "../core/Layer";
import { Frame } from "../core/Frame";
import { Instance } from "../core/Instance";
import { Sprite } from "../core/Sprite";
import { modWrap } from "../core/util/math";

// Set up canvas
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext('2d')!
var dpr = setupCanvas(canvas) // Device pixel ratio

// Set up animation context and animation libraries
const animContext = new Canvas2dAnimationContext(ctx)
const hatsLibrary = animContext.createLibrary('hats', './hats')


async function init(){
    await hatsLibrary.loadData();
    update();
}


let frame = 0;
let hatIndex = 3;
let showSpriteBorders = false;
let eyesFrame = 1;
let noseRotation = 0;
let reverse = false;
let playSpeed = 1;
let lerp = false;

document.onkeydown = e => {
    switch(e.key){
        case '1': hatIndex = 0; break;
        case '2': hatIndex = 1; break;
        case '3': hatIndex = 2; break;
        case '4': hatIndex = 3; break;
        case 'r': reverse = !reverse; break;
        case '=': playSpeed *= 2; break;
        case '-': playSpeed /= 2; break;
        case 'l': lerp = !lerp; break;
        case 'ArrowUp': eyesFrame++; break
        case 'ArrowDown': eyesFrame--; break
        case 'ArrowLeft': noseRotation+=0.2; break
        case 'ArrowRight': noseRotation-=0.2; break
        case ' ': showSpriteBorders = !showSpriteBorders; break
    }

    hatIndex = modWrap(hatIndex, 4)
    eyesFrame = modWrap(eyesFrame, 2)
}


// Note: This is a recursive function. It will walk
// the logic along the display hierarchy. The hierarchy
// is like this:
//
// - Clip
//     - Layer
//     - Layer
//          - Frame (since frame chosen by frame:number)
//              - Instance
//              - Instance
//                  - Sprite or Clip 
//
// This function shows a few different ways you can dynamically manipulate
// the rendering:
//     - How you can dynamically set a frame on a layer (which you could also do on a clip)
//     - How you can dynamically swap out one clip for another
//     - How you can draw arbitrary stuff on the 2d context
//     - How you can apply state base transformations
//
function drawWithLogic(item:Drawable, frame:number, lerp?:boolean){
    if(item instanceof Clip){
        // Rotate any clip named game/Walker_Nose_Nose
        if(item.name == "game/Walker_Nose_Nose"){
            ctx.save();
                ctx.rotate(noseRotation)
                item.draw(frame, drawWithLogic, lerp)
            ctx.restore();
        }else{
            item.draw(frame, drawWithLogic, lerp)
        }
    }else if(item instanceof Layer){
        // If the layer name is "layer_eye", choose the frame
        if(item.name=="layer_eye"){
            item.draw(eyesFrame, drawWithLogic, lerp)
        }else{
            item.draw(frame, drawWithLogic, lerp)
        }
    }else if(item instanceof Frame){
        item.draw(frame, drawWithLogic, lerp)
    }else if(item instanceof Instance){
        // If the instance's layer name is "layer_hat", choose the hat clip
        if(item.frame.layer.name=="layer_hat"){
            hatsLibrary.symbol("Hat_"+hatIndex).draw(frame, drawWithLogic, lerp)
        }else{
            item.draw(frame, drawWithLogic, lerp)
        }
    }else if(item instanceof Sprite){
        item.draw(frame) // Note: leaf node, so don't supply drawWithLogic as an argument
        // Draw a red border over any sprite
        if(showSpriteBorders){
            ctx.strokeStyle = '#CC0000'
            ctx.strokeRect(0, 0, item.width, item.height)
        }
    }
}


function update(){
    ctx.fillStyle = '#cccccc'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();

        ctx.fillStyle = '#333333'
        ctx.font = '36px sans-serif';
        ctx.fillText('1,2,3,4: Change hat', 20, 50);
        ctx.fillText('Up/Down: Change eyes', 20, 100);
        ctx.fillText('Left/Right: Rotate nose', 20, 150);
        ctx.fillText('Spacebar: Toggle debug border', 20, 200);
        ctx.fillText('l: Toggle lerp', 20, 250);
        ctx.fillText('r: Reverse play speed', 20, 300);
        ctx.fillText('+ and -: Change play speed', 20, 350);
        
        ctx.translate(canvas.width/2, canvas.height/2)
        ctx.scale(dpr, dpr)

        ctx.save();
            ctx.translate(-200, 0)
            hatsLibrary.symbol("Walker_Laser").draw(frame, drawWithLogic, lerp)
        ctx.restore()

        ctx.save()
            ctx.translate(0, 0)
            hatsLibrary.symbol("Walker_Nose").draw(frame, drawWithLogic, lerp)
        ctx.restore()

        ctx.save();
            ctx.translate(200, -50)
            hatsLibrary.symbol("StarDude").draw(frame, drawWithLogic, lerp)
        ctx.restore()
    
    ctx.restore()
    
    frame += reverse ? -playSpeed : playSpeed;
    requestAnimationFrame(update)
}


init();

