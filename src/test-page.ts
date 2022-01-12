import { createLibrary } from "./library";
import { addExampleButtons, setupCanvas } from "./example-utils";
import { Library } from "./core/Library";
import { Drawable } from "./core/Drawable";
import { Clip } from "./core/Clip";
import { Layer } from "./core/Layer";
import { Instance } from "./core/Instance";

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const buffer = canvas.getContext('2d')!

// Device pixel ratio
var dpr = setupCanvas(canvas)

var colsAndRows = 1;


const minusButton = document.createElement('button')
minusButton.innerHTML = '-'
minusButton.onclick = () => { if(colsAndRows > 1) colsAndRows-- };
document.getElementById("buttons")!.appendChild(minusButton);

const plusButton = document.createElement('button')
plusButton.innerHTML = '+'
plusButton.onclick = () => colsAndRows++;
document.getElementById("buttons")!.appendChild(plusButton);



async function init(){
    const lib = new Library('test', 'test');
    await lib.loadData();

    let count = -1;
    function traceOut(item:Drawable, frame:number){
        const hasSiblings = item instanceof Layer || item instanceof Instance;
        if(!hasSiblings) count++;

        var prefix = "";
        for(let i = 0; i < count; i++) prefix += "    "
        console.log(prefix + item.constructor.name.toUpperCase() + ": " + item.name);
        
        item.visit(frame, traceOut);
        
        if(!hasSiblings) count--;
    }

    traceOut(lib.clips[0], 100);
}


init();

/*
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
        buffer.scale(dpr, dpr)

        const num = colsAndRows+1;
        var xo = canvas.width/num/2;
        var yo = canvas.height/num/2;
        if(symbolName!=null){
            for(var x = 1; x < num; x++){
                for(var y = 1; y < num; y++){
                    buffer.save();
                    buffer.translate(-(num*xo/2)+x*xo, -(num*yo/2)+y*xo)
                    lib.draw(buffer, symbolName, frame);
                    buffer.restore();                    
                }
            }
        }
        
        buffer.restore()
        
        frame++;
        requestAnimationFrame(update)
    }
    update();
}

init();

*/
