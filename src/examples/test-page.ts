import { addExampleButtons, setupCanvas } from "./example-utils";
import { Canvas2dAnimationContext } from "../Canvas2dAnimationContext";

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext('2d')!
const animContext = new Canvas2dAnimationContext(ctx)

const libraries = {
    test: animContext.createLibrary('test', 'test')
}



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
    await libraries.test.loadData();
    addExampleButtons(libraries.test, (nextSymbol)=>symbol=nextSymbol)
    
    let frame = 0;
    let symbol = libraries.test.clips[0]

    
    function update(){
        ctx.fillStyle = '#cccccc'
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        
        ctx.translate(canvas.width/2, canvas.height/2)
        ctx.scale(dpr, dpr)

        const num = colsAndRows+1;
        var xo = canvas.width/num/2;
        var yo = canvas.height/num/2;
    
        for(var x = 1; x < num; x++){
            for(var y = 1; y < num; y++){
                ctx.save();
                ctx.translate(-(num*xo/2)+x*xo, -(num*yo/2)+y*xo)
                    symbol.draw(frame)
                ctx.restore();
            }
        }
        
        ctx.restore()
        
        frame++;
        requestAnimationFrame(update)
    }
    update();

}

init();

