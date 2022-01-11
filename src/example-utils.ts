import { Library } from "./library";


export function setupCanvas(canvas:HTMLCanvasElement) {
    const buffer = canvas.getContext('2d')!

    buffer.imageSmoothingEnabled = true;
    buffer.imageSmoothingQuality = 'high'

    // Get the device pixel ratio, falling back to 1.
    
   var bodyRec = document.body.getBoundingClientRect();

    canvas.width = Math.min(500, bodyRec.width - 8);
    canvas.height = canvas.width;

    var dpr = window.devicePixelRatio || 1;

    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.

    canvas.style.border = "2px solid gray";
    canvas.style.width = "" + canvas.width + "px";
    canvas.style.height = "" + canvas.height + "px";
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    //ctx.scale(dpr, dpr);
    //console.log(dpr)
    //return ctx;
    return dpr;
}



export function addExampleButtons(lib:Library, onClick:(symbolName:string)=>void){
    lib.anims.symbolDictionary.symbols.forEach(symbol => {
        if(symbol.symbolName.indexOf("/")!=-1 || symbol.symbolName.indexOf("Symbol ")==0 || symbol.symbolName.indexOf("Tween ")==0 || symbol.symbolName.indexOf("/Symbol ")!=-1 || symbol.symbolName.indexOf("/Tween ")!=-1) return;
        var li = document.createElement("li")
        var button = document.createElement("button")
        button.innerHTML = symbol.symbolName
        button.onclick = () => onClick(symbol.symbolName)
        document.getElementById("buttons")!.appendChild(button)
    })
}