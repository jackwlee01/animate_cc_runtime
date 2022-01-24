import { setupCanvas } from "./example-utils";
import { Canvas2dScene } from "../Canvas2dScene";

// Set up canvas
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx2d = canvas.getContext('2d')!
var dpr = setupCanvas(canvas) // Device pixel ratio

// Set up animation context and animation libraries
const scene = new Canvas2dScene(ctx2d)
const hatsLibrary = scene.createLibrary('hats', './hats')

// Example state
let mouseDown = false
let mousePressed = false

canvas.onmousedown = () => {
    mousePressed = true
    mouseDown = true
}
canvas.onmouseup = () => {
    mouseDown = false
}

async function init(){
    await hatsLibrary.loadData();
    update();
}


let frame = 0;
    
function update(){
    scene.ctx.clearRect(0, 0, canvas.width, canvas.height)


    scene.ctx.save();
    
        scene.ctx.translate(canvas.width/2, canvas.height/2)
        scene.ctx.scale(dpr, dpr)
        hatsLibrary.symbol("StarDude").draw(frame)

    scene.ctx.restore()
    
    if(mouseDown==false) frame+=1;
    mousePressed = false;
    requestAnimationFrame(update)
}

init();
