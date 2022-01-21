import { setupCanvas } from "./example-utils";
import { Canvas2dAnimationContext } from "../Canvas2dAnimationContext";

// Set up canvas
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext('2d')!
var dpr = setupCanvas(canvas) // Device pixel ratio

// Set up animation context and animation libraries
const animContext = new Canvas2dAnimationContext(ctx)
const testLibrary = animContext.createLibrary('test', './test')


async function init(){
    await testLibrary.loadData();
    update();
}


let frame = 0;
    
function update(){
    ctx.fillStyle = '#cccccc'
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    
        ctx.translate(canvas.width/2, canvas.height/2)
        ctx.scale(dpr, dpr)

        testLibrary.symbol("StarDude").draw(frame)

        ctx.save()
        ctx.translate(250, 0)
        // NOTE: Filter support is limited to drop shadows
        testLibrary.symbol("Mask_test").draw(frame)
        ctx.restore()
    
    ctx.restore()
    
    frame++;
    requestAnimationFrame(update)
}

init();
