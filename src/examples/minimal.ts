import { setupCanvas } from "./example-utils";
import { Canvas2dAnimationContext } from "../Canvas2dAnimationContext";
import { Clip } from "../core/Clip";
import { Library } from "../core/Library";


const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext('2d')!
var dpr = setupCanvas(canvas) // Device pixel ratio

// Set up animation context and libraries
const animContext = new Canvas2dAnimationContext(ctx)
const testLibrary = animContext.createLibrary('test', './test')


async function init(){
    await testLibrary.loadData();

    let frame = 0;
   
    
    function update(){
        ctx.fillStyle = '#cccccc'
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        
        ctx.translate(canvas.width/2, canvas.height/2)
        ctx.scale(dpr, dpr)

        testLibrary.symbol("StarDude").draw(frame)
        
        ctx.restore()
        
        frame++;
        requestAnimationFrame(update)
    }
    update();

}

init();

