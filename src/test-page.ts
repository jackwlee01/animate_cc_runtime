import { createLibrary } from "./library";
import { addExampleButtons, setupCanvas } from "./example-utils";
import { Library } from "./core/Library";
import { Drawable } from "./core/Drawable";
import { Clip } from "./core/Clip";
import { Layer } from "./core/Layer";
import { Instance } from "./core/Instance";
import { Frame } from "./core/Frame";
import { Sprite } from "./core/Sprite";
import { ClipInstance } from "./core/ClipInstance";

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

    let frame = 0;

    var symbol = lib.clipsByName["Walker_Laser"]


    function draw(item:Drawable, frame:Float){
        if(item instanceof Clip){
            item.visit(frame, draw);
        }else if(item instanceof Layer){
            item.visit(frame, draw);
        }else if(item instanceof Frame){
            item.visit(frame, draw)
        }else if(item instanceof Instance){
            buffer.save();
            buffer.transform(item.matrix2d.a, item.matrix2d.b, item.matrix2d.c, item.matrix2d.d, item.matrix2d.e, item.matrix2d.f)
            item.visit(frame, draw);
            buffer.restore();
        }else if(item instanceof Sprite){
            buffer.drawImage(item.atlas.image, item.x, item.y, item.width, item.height, 0, 0, item.width, item.height)
        }
    }
    
    
    function update(){
        buffer.fillStyle = '#cccccc'
        buffer.fillRect(0, 0, canvas.width, canvas.height);
        buffer.save();
        
        buffer.translate(canvas.width/2, canvas.height/2)
        buffer.scale(dpr, dpr)

        /*
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
        */


        draw(symbol, frame);
        
        buffer.restore()
        
        frame++;
        requestAnimationFrame(update)
    }
    update();

}

init();


/*
async function init(){
    const lib = new Library('test', 'test');
    await lib.loadData();

    let count = -1;
    function traceOut(item:Drawable, frame:number){
        count++;

        var prefix = "";
        for(let i = 0; i < count; i++) prefix += "    "
        console.log(prefix + item.constructor.name + ": " + item.name);

        item.visit(frame, traceOut);
        count--;
    }

    traceOut(lib.clips[0], 100);
}

init();
*/

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
