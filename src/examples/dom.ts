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
let play = true;
let swap = false;

const btnPause = document.getElementById('btn-pause')!
const btnSwap = document.getElementById('btn-swap')!
btnPause.onclick = () => {
    play = !play;
    btnPause.innerText = play ? "Pause" : "Play"
    let gunInput = document.getElementById("gun-input");
    if(gunInput){
        gunInput.focus();
    }
}
btnSwap.onclick = () => {
    swap = !swap;
}

let gunInput = document.createElement('input')
gunInput.id = "gun-input"
gunInput.value = "GUN!!!!"
gunInput.style.boxShadow = '0px 3px 8px rgb(0 0 0 / 40%)'
gunInput.style.position = 'absolute'
gunInput.style.top = '-10px'
gunInput.style.left = '-100px'
gunInput.style.width = '150px'
gunInput.style.height = '30px'

let shellInput = document.createElement('input')
shellInput.type = 'checkbox'
shellInput.id = "shell-input"
shellInput.style.position = 'absolute'
shellInput.style.width = '30px'
shellInput.style.height = '30px'
shellInput.style.transform = 'translate(-50%, -50%)'
shellInput.checked = true;


function drawWithLogic(item:Drawable, frame:number, lerp?:boolean){
    if(swap && item.name=="Shell"){
        animContext.current.appendChild(shellInput)
    }else if(swap && item.name=="stardude_assets/StarGuyGun"){
        animContext.current.appendChild(gunInput)
    }else{
        item.draw(frame, drawWithLogic, lerp)
    }
}

function update(){
    if(play){
        animContext.clear();

        animContext.pushTranslate('0px', '10px')
        animContext.pushScale('1', '1')
        animContext.pushRotation('0deg')
        testLibrary.symbol("StarDude").draw(frame, drawWithLogic)
        animContext.pop();
        animContext.pop();
        animContext.pop();

        frame++;
    }

    requestAnimationFrame(update)
}




init();
