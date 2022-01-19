import { Layer } from "..";
import { Drawable } from "../core/Drawable";
import { DomAnimationContext } from "../DomAnimationContext";

// Set up animation context and animation libraries
const animContext = new DomAnimationContext('anim')
const testLibrary = animContext.createLibrary('test', './test')


async function init(){
    await testLibrary.loadData();
    update();
}

let frame = 0;
let gunInput = document.createElement('input')
    

function drawWithLogic(item:Drawable, frame:number, lerp?:boolean){
    if(item instanceof Layer && item.name=="gun"){
        item.draw(frame, drawWithLogic, lerp)
    }else{
        item.draw(frame, drawWithLogic, lerp)
    }
}

function update(){
    
    animContext.clear();

    animContext.pushTranslate('0px', '10px')
    animContext.pushScale('1', '1')
    animContext.pushRotation('0deg')
    testLibrary.symbol("StarDude").draw(frame, drawWithLogic)
    animContext.pop();
    animContext.pop();
    animContext.pop();

    frame++;

    requestAnimationFrame(update)
}


init();
