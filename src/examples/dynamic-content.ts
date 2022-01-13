import { setupCanvas } from "./example-utils";
import { Canvas2dAnimationContext } from "../Canvas2dAnimationContext";
import { Drawable } from "../core/Drawable";
import { Clip } from "../core/Clip";
import { Layer } from "../core/Layer";
import { Frame } from "../core/Frame";
import { Instance } from "../core/Instance";
import { Sprite } from "../core/Sprite";
import { modWrap } from "../core/util";

// Set up canvas
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext('2d')!
var dpr = setupCanvas(canvas) // Device pixel ratio

// Set up animation context and animation libraries
const animContext = new Canvas2dAnimationContext(ctx)
const hatsLibrary = animContext.createLibrary('hats', './hats')


async function init(){
    await hatsLibrary.loadData();

    let frame = 0;
    let hat = 3;
    let showSpriteBorders = false;
    let eyes = 1;

    document.onkeydown = e => {
        switch(e.key){
            case 'ArrowUp': hat++; break
            case 'ArrowDown': hat--; break
            case 'ArrowLeft': eyes--; break
            case 'ArrowRight': eyes++; break
            case ' ': showSpriteBorders = !showSpriteBorders; break
        }

        hat = modWrap(hat, 4)
        eyes = modWrap(eyes, 2)
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
    //
    function drawWithLogic(item:Drawable, frame:number){
        if(item instanceof Clip){
            item.draw(frame, drawWithLogic)
        }else if(item instanceof Layer){
            if(item.name=="layer_eye"){
                item.draw(eyes, drawWithLogic)
            }else{
                item.draw(frame, drawWithLogic)
            }
        }else if(item instanceof Frame){
            item.draw(frame, drawWithLogic)
        }else if(item instanceof Instance){
            if(item.frame.layer.name=="layer_hat"){
                hatsLibrary.symbol("Hat_"+hat).draw(frame, drawWithLogic)
            }else{
                item.draw(frame, drawWithLogic)
            }
        }else if(item instanceof Sprite){
            item.draw(frame) // Note: leaf node, so don't supply drawWithLogic as an argument
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
        ctx.fillText('Up/Down: Change hat', 20, 50);
        ctx.fillText('Left/Right: Change eyes', 20, 100);
        ctx.fillText('Spacebar: Toggle debug border', 20, 150);
        

        ctx.translate(canvas.width/2, canvas.height/2)
        ctx.scale(dpr, dpr)

        ctx.save();
        ctx.translate(-100, 0)
        hatsLibrary.symbol("Walker_Laser").draw(frame, drawWithLogic)
        ctx.restore()

        ctx.save()
        ctx.translate(100, 0)
        hatsLibrary.symbol("Walker_Nose").draw(frame, drawWithLogic)
        ctx.restore()
        
        ctx.restore()
        
        frame++;
        requestAnimationFrame(update)
    }
    update();

}

init();

