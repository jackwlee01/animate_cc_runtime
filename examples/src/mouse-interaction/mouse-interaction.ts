import { setupCanvas } from "../example-utils";
import { SceneCanvas2d } from "animcc/SceneCanvas2d";
import { Drawable } from "animcc/Drawable";
import { Sprite } from "animcc/Sprite";
import { Clip } from "animcc/Clip";



// Set up canvas
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx2d = canvas.getContext('2d')!
var dpr = setupCanvas(canvas) // Device pixel ratio

// Set up animation context and animation libraries
const scene = new SceneCanvas2d(ctx2d)
const hatsLibrary = scene.createLibrary('hats', '../assets/hats')


async function init(){
    await hatsLibrary.loadData();
    update();
}


// App State
let frame = 0
let mouseDown = false
let mousePressed = false

// Handlers
canvas.onmousedown = () => {
    mousePressed = true
    mouseDown = true
}
canvas.onmouseup = () => {
    mouseDown = false
}

// Experimental: This library shouldn't focus on interaction, but it can provide a few rudimentary methods
// to faciliate users to build out thier own interaction functionality. This example shows how 
// coordinates can be attained in a local space, and how pixels can be queried to faciliate
// mouse interaction. A closure is used to faciliate local state.
function createState(){
    // Item state
    let offsets = {} as Record<string, DOMPoint>
    let selection = null as null | {
        item:Sprite,
        offset:DOMPoint,
    };

    return function drawWithLogic(item:Drawable, frame:number, lerp?:boolean){
        if(mouseDown==false) selection = null

        if(item instanceof Clip){
            const highlight = selection && item.name=="StarDude";
            if(highlight) scene.pushDropShadow('#009900', 10, 0, 0);
            item.draw(frame, lerp, drawWithLogic)
            if(highlight) scene.popDropShadow()
        }else if(item instanceof Sprite){
            const offset = offsets[item.name];
            const offsetX = offset ? offset.x : 0
            const offsetY = offset ? offset.y : 0
            scene.ctx.save()
                scene.ctx.translate(offsetX, offsetY)
                if(!selection && mousePressed && item.isSolidPixelAt(scene.mouseX, scene.mouseY, scene.ctx.getTransform())){
                    selection = { item, offset: scene.getLocal(scene.mouseX, scene.mouseY) }
                   if(offsets[item.name]==null) offsets[item.name] = new DOMPoint(0, 0)
                }
            scene.ctx.restore()
            if(selection && selection.item==item){
                const local = scene.getLocal(scene.mouseX, scene.mouseY)
                offsets[item.name].x = local.x - selection.offset.x
                offsets[item.name].y = local.y - selection.offset.y
            }
            scene.ctx.save()
                scene.ctx.translate(offsetX, offsetY)
                item.draw(frame, lerp, drawWithLogic)
            scene.ctx.restore()
            
        }else{
            item.draw(frame, lerp, drawWithLogic)
        
        }
    }
}

const callbackA = createState()
const callbackB = createState()

function update(){
    scene.ctx.clearRect(0, 0, canvas.width, canvas.height)

    scene.ctx.save();

        scene.ctx.font = '36px sans-serif';
        scene.ctx.fillText('Click and drag sprites on the animation', 20, 50);
    
        scene.ctx.translate(canvas.width/2, canvas.height/2)
        scene.ctx.scale(dpr, dpr)

        scene.ctx.translate(-100, 0);
        scene.draw(hatsLibrary.symbol("StarDude"), frame, true, callbackA)

        scene.ctx.translate(200, 0);
        scene.draw(hatsLibrary.symbol("StarDude"), frame, true, callbackB)

    scene.ctx.restore()
    
    if(mouseDown==false) frame+=1;
    mousePressed = false;
    requestAnimationFrame(update)
}

init();
