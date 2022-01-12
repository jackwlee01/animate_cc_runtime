import { Clip } from "./core/Clip";
import { Library } from "./core/Library";



export function setupCanvas(canvas:HTMLCanvasElement) {
    const buffer = canvas.getContext('2d')!

    buffer.imageSmoothingEnabled = true;
    buffer.imageSmoothingQuality = 'high'

    // Get the device pixel ratio, falling back to 1.
    
   var bodyRec = document.body.getBoundingClientRect();

    canvas.width = Math.min(1000, bodyRec.width - 8);
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



export function addExampleButtons(lib:Library, onClick:(nextSymbol:Clip)=>void){
    console.log(lib)
    for(const clip of lib.clips){
        console.log("yo")
        if(clip.name.indexOf("/")!=-1 || clip.name.indexOf("Symbol ")==0 || clip.name.indexOf("Tween ")==0 || clip.name.indexOf("/Symbol ")!=-1 || clip.name.indexOf("/Tween ")!=-1) continue;
        var button = document.createElement("button")
        button.innerHTML = clip.name
        button.onclick = () => onClick(clip)
        document.getElementById("buttons")!.appendChild(button)
    }
}