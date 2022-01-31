import { setupCanvas } from "./example-utils";
import { Canvas2dScene } from "../Canvas2dScene";
import { Drawable } from "../core/Drawable";
import { Clip } from "../core/Clip";
import { Layer } from "../core/Layer";
import { Frame } from "../core/Frame";
import { Instance } from "../core/Instance";
import { Sprite } from "../core/Sprite";
import { modWrap } from "../core/util/math";

// Set up canvas
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx2d = canvas.getContext('2d')!
var dpr = setupCanvas(canvas) // Device pixel ratio

// Set up animation context and animation libraries
const scene = new Canvas2dScene(ctx2d)
const hatsLibrary = scene.createLibrary('hats', './hats')


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
            scene.ctx.save();
                scene.ctx.rotate(noseRotation)
                item.draw(frame, lerp, drawWithLogic)
            scene.ctx.restore();
        }else{
            item.draw(frame, lerp, drawWithLogic)
        }
    }else if(item instanceof Layer){
        // If the layer name is "layer_eye", choose the frame
        if(item.name=="layer_eye"){
            item.draw(eyesFrame, lerp, drawWithLogic)
        }else{
            item.draw(frame, lerp, drawWithLogic)
        }
    }else if(item instanceof Frame){
        item.draw(frame, lerp, drawWithLogic)
    }else if(item instanceof Instance){
        // If the instance's layer name is "layer_hat", choose the hat clip
        if(item.frame.layer.name=="layer_hat"){
            hatsLibrary.symbol("Hat_"+hatIndex).draw(frame, lerp, drawWithLogic)
        }else{
            item.draw(frame, lerp, drawWithLogic)
        }
    }else if(item instanceof Sprite){
        item.draw(frame) // Note: leaf node, so don't supply drawWithLogic as an argument

        
        // Draw a red border over any sprite
        if(showSpriteBorders){
            scene.ctx.strokeStyle = '#CC0000'
            scene.ctx.strokeRect(0, 0, item.width, item.height)
        }

        if(item.isSolidPixelAt(scene.mouseX, scene.mouseY, scene.ctx.getTransform())){
            scene.ctx.strokeStyle = '#FF00FF'
            scene.ctx.strokeRect(0, 0, item.width, item.height)
        }
    }
}


function update(){
    scene.ctx.fillStyle = '#cccccc'
    scene.ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    scene.ctx.save();

        scene.ctx.fillStyle = '#333333'
        scene.ctx.font = '36px sans-serif';
        scene.ctx.fillText('Mouse over: Highlight spites under cursor', 20, 50);
        scene.ctx.fillText('1,2,3,4: Change hat', 20, 100);
        scene.ctx.fillText('Up/Down: Change eyes', 20, 150);
        scene.ctx.fillText('Left/Right: Rotate nose', 20, 200);
        scene.ctx.fillText('Spacebar: Toggle debug border', 20, 250);
        scene.ctx.fillText('l: Toggle lerp', 20, 300);
        scene.ctx.fillText('r: Reverse play speed', 20, 350);
        scene.ctx.fillText('+ and -: Change play speed', 20, 400);
        
        scene.ctx.translate(canvas.width/2, canvas.height/2)
        scene.ctx.scale(dpr, dpr)

        scene.ctx.save();
            scene.ctx.translate(-200, 0)
            hatsLibrary.symbol("Walker_Laser").draw(frame, lerp, drawWithLogic)
        scene.ctx.restore()

        scene.ctx.save()
            scene.ctx.translate(0, 0)
            hatsLibrary.symbol("Walker_Nose").draw(frame, lerp, drawWithLogic)
        scene.ctx.restore()

        scene.ctx.save();
            scene.ctx.translate(200, -50)
            hatsLibrary.symbol("StarDude").draw(frame, lerp, drawWithLogic)
        scene.ctx.restore()

        scene.ctx.save()
            const coord = scene.getLocal(scene.mouseX, scene.mouseY)
            scene.ctx.translate(coord.x, coord.y)
            scene.ctx.beginPath()
            scene.ctx.arc(0, 0, 6, 0, 2*Math.PI)
            scene.ctx.stroke()
        scene.ctx.restore()
    
    scene.ctx.restore()

    //frame = 130
    frame += reverse ? -playSpeed : playSpeed;
    requestAnimationFrame(update)
}


init();

