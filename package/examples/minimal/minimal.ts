import { setupCanvas } from "../example-utils";
import { SceneCanvas2d } from "animcc/SceneCanvas2d";

// Set up canvas
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx2d = canvas.getContext('2d')!
var dpr = setupCanvas(canvas) // Device pixel ratio

// Set up animation context and animation libraries
const scene = new SceneCanvas2d(ctx2d)
const testLibrary = scene.createLibrary('test', '../assets/test')


async function init(){
    await testLibrary.loadData();
    update();
}


let frame = 0;
    
function update(){
    scene.ctx.clearRect(0, 0, canvas.width, canvas.height)

    scene.ctx.save();
    
        scene.ctx.translate(canvas.width/2, canvas.height/2)
        scene.ctx.scale(dpr, dpr)

        testLibrary.symbol("Scene").draw(frame)

    scene.ctx.restore()
    
    frame += 1;
    requestAnimationFrame(update)
}

init();
