import { setupCanvas } from "./example-utils";
import { Canvas2dScene } from "../Canvas2dScene";
import { Drawable } from "../core/Drawable";
import { Sprite } from "../core/Sprite";
import { SpriteInstance } from "../core/SpriteInstance";

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


// Example state
let mouseDown = false
let mousePressed = false
let frame = 0
let offsets = {} as Record<string, DOMPoint>
let selection = null as null | {
    item:SpriteInstance,
    offset:DOMPoint,
};

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
// mouse interaction.
function drawWithLogic(item:Drawable, frame:number, lerp?:boolean){
    if(mouseDown==false) selection = null

    if(item instanceof SpriteInstance){
        const offset = offsets[item.item.name];
        const offsetX = offset ? offset.x : 0
        const offsetY = offset ? offset.y : 0

        scene.ctx.save()
            scene.ctx.translate(offsetX, offsetY)

            if(mousePressed){
                if(item.item.isSolidPixelAt(scene.mouseX, scene.mouseY, scene.ctx.getTransform())){
                    selection = {
                        item: item,
                        offset: scene.getLocal(scene.mouseX, scene.mouseY)
                    }
                    if(offsets[selection.item.itemName]==null) offsets[selection.item.itemName] = new DOMPoint(0, 0);
                }
            }

            if(selection&&selection.item==item){
                scene.ctx.strokeStyle = '#CC0000'
                scene.ctx.strokeRect(0, 0, item.item.width, item.item.height)
                const offset = scene.getLocal(scene.mouseX, scene.mouseY)
                offsets[selection.item.itemName].x += offset.x - selection.offset.x
                offsets[selection.item.itemName].y += offset.y - selection.offset.y
                selection.offset = offset
            }
            item.draw(frame, lerp, drawWithLogic)
        scene.ctx.restore()
    }else{
        item.draw(frame, lerp, drawWithLogic)
    }
}


function update(){
    scene.ctx.clearRect(0, 0, canvas.width, canvas.height)

    scene.ctx.save();

        scene.ctx.font = '36px sans-serif';
        scene.ctx.fillText('Click and drag sprites on the animation', 20, 50);
    
        scene.ctx.translate(canvas.width/2, canvas.height/2)
        scene.ctx.scale(dpr, dpr)

        scene.ctx.translate(-100, 0);
        hatsLibrary.symbol("StarDude").draw(frame, true, drawWithLogic)

        scene.ctx.translate(200, 0);
        hatsLibrary.symbol("StarDude").draw(frame, true, drawWithLogic)

    scene.ctx.restore()
    
    if(mouseDown==false) frame+=1;
    mousePressed = false;
    requestAnimationFrame(update)
}

init();
