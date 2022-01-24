import { addExampleButtons, setupCanvas } from "./example-utils";
import { Canvas2dScene } from "../Canvas2dScene";
import { Clip } from "../core/Clip";
import { Library } from "../core/Library";


const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx2d = canvas.getContext('2d')!
var dpr = setupCanvas(canvas) // Device pixel ratio

// Set up animation context and libraries
const scene = new Canvas2dScene(ctx2d)
const libraries = {
    test: scene.createLibrary('test', './test'),
    monsters: scene.createLibrary('monsters', './monsters'),
}


async function init(){
    // Load the libraries
    await libraries.test.loadData();
    await libraries.monsters.loadData();
    update();
}


// Example state
let frame = 0;
let library = libraries[Object.keys(libraries)[0] as keyof typeof libraries]
let symbol =library.clips[0]
var colsAndRows = 1;

// Set up example ui
const onSymbolPicked = (nextSymbol:Clip) => symbol=nextSymbol
const onMinus =  () => { if(colsAndRows > 1) colsAndRows-- }
const onPlus =  () => colsAndRows++
const onLibrarySeleced = (nextLibrary:Library) => {
    library = nextLibrary
    symbol = library.clips[0]
}

addExampleButtons(Object.keys(libraries)[0], libraries, onLibrarySeleced, onSymbolPicked, onMinus, onPlus)


function update(){
    scene.ctx.fillStyle = '#cccccc'
    scene.ctx.fillRect(0, 0, canvas.width, canvas.height);

    scene.ctx.save();
    
        scene.ctx.translate(canvas.width/2, canvas.height/2)
        scene.ctx.scale(dpr, dpr)

        const num = colsAndRows+1;
        var xo = canvas.width/num/2;
        var yo = canvas.height/num/2;
    
        for(var x = 1; x < num; x++){
            for(var y = 1; y < num; y++){
                scene.ctx.save();
                    scene.ctx.translate(-(num*xo/2)+x*xo, -(num*yo/2)+y*xo)
                    symbol.draw(frame)
                scene.ctx.restore();
            }
        }
    
    scene.ctx.restore()
    
    frame++;
    requestAnimationFrame(update)
}


init();

