import { createLibrary } from "./library";
import { addExampleButtons, setupCanvas } from "./example-utils";

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const buffer = canvas.getContext('2d')!

// Device pixel ratio
var dpr = setupCanvas(canvas)


async function init(){
    const lib = await createLibrary('test');
    
    let symbolName:string|null = lib.anims.symbolDictionary.symbols[0]?.symbolName;
    addExampleButtons(lib, (nextSymbolName) => symbolName = nextSymbolName); 

    let frame = 0;

    function update(){
        buffer.fillStyle = '#cccccc'
        buffer.fillRect(0, 0, canvas.width, canvas.height);
        buffer.save();
        buffer.translate(canvas.width/2, canvas.height/2)
        buffer.scale(dpr/2, dpr/2)

        if(symbolName!=null){
            lib.draw(buffer, symbolName, frame);
        }
        
        buffer.restore()
        
        frame++;
        requestAnimationFrame(update)
    }
    update();
}

init();
