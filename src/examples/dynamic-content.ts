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
    function drawWithLogic(item:Drawable, frame:number){
        // Clip
        if(item instanceof Clip){
            item.draw(frame, drawWithLogic)

        // Layer
        }else if(item instanceof Layer){
            // This example shows how to dynamically choose a frame
            if(item.name=="layer_eye"){
                item.draw(eyes, drawWithLogic)
            }else{
                item.draw(frame, drawWithLogic)
            }
        
        // Frame
        }else if(item instanceof Frame){
            item.draw(frame, drawWithLogic)

        // Instance
        }else if(item instanceof Instance){
            // This example shows how to dynamically swap a symbol instance
            if(item.frame.layer.name=="layer_hat"){
                hatsLibrary.symbol("Hat_"+hat).draw(frame, drawWithLogic)
            }else{
                item.draw(frame, drawWithLogic)
            }
            
        // Sprite
        }else if(item instanceof Sprite){
            // This example shows how draw extra stuff in a drawable item (Sprite in this scenario)
            // Note: we are not passing drawWithLogic here as we want to just draw the Sprites (leaf nodes)
            item.draw(frame)
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

