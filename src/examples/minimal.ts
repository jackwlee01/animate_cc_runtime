import { setupCanvas } from "./example-utils";
import { Canvas2dAnimationContext } from "../Canvas2dScene";

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
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.save();
    
        ctx.translate(canvas.width/2, canvas.height/2)
        ctx.scale(dpr, dpr)

        testLibrary.symbol("Scene").draw(frame)

    ctx.restore()
    
    frame+=1;
    requestAnimationFrame(update)
}

init();
