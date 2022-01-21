import { Clip } from "../core/Clip";
import { Library } from "../core/Library";


export function setupCanvas(canvas:HTMLCanvasElement) {
    // Set the context quality and smoothing
    const ctx = canvas.getContext('2d')!
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high'

    // Set the canvas according to window width
    var bodyRec = document.body.getBoundingClientRect();
    canvas.width = Math.min(1000, bodyRec.width - 8);
    canvas.height = canvas.width;

    // Get the device pixel ratio, falling back to 1.
    let dpr = window.devicePixelRatio || 1;

    // Get the size of the canvas in CSS pixels.
    let rect = canvas.getBoundingClientRect();
    
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    //canvas.style.border = "2px solid gray";
    canvas.style.width = "" + canvas.width + "px";
    canvas.style.height = "" + canvas.height + "px";
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    return dpr;
}



export function addExampleButtons(libraryKey:string, libs:Record<string, Library>, onLibrarySelected:(nextLibrary:Library)=>void, onSymbolPicked:(nextSymbol:Clip)=>void, onMinus:()=>void, onPlus:()=>void){
    const library = libs[libraryKey]
    const buttons = document.getElementById("buttons")!

    const selector = document.createElement('select')
    selector.value = libraryKey
    selector.onchange = (e) => {
        const buttons = document.getElementById('buttons')!
        while(buttons.childNodes.length > 0) buttons.childNodes[0].remove();
        addExampleButtons(selector.value, libs, onLibrarySelected, onSymbolPicked, onMinus, onPlus)
        onLibrarySelected(libs[selector.value])
    }
    buttons.appendChild(selector)
    for(const libraryName of Object.keys(libs)){
        const option = document.createElement('option')
        option.value = libraryName
        option.selected = libraryName == libraryKey
        option.innerText = libraryName
        selector.appendChild(option)
    }

    const minusButton = document.createElement('button')
    minusButton.innerHTML = '-'
    minusButton.onclick = onMinus
    buttons.appendChild(minusButton);

    const plusButton = document.createElement('button')
    plusButton.innerHTML = '+'
    plusButton.onclick = onPlus
    buttons.appendChild(plusButton);

    for(const clip of library.clips){
        if(clip.name.indexOf("/")!=-1 || clip.name.indexOf("Symbol ")==0 || clip.name.indexOf("Tween ")==0 || clip.name.indexOf("/Symbol ")!=-1 || clip.name.indexOf("/Tween ")!=-1) continue;
        var button = document.createElement("button")
        button.innerHTML = clip.name
        button.onclick = () => onSymbolPicked(clip)
        buttons.appendChild(button)
    }
}