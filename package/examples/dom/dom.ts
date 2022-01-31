import { SceneDom } from "animcc/SceneDom";
import { Drawable } from "animcc/Drawable";


// Set up animation context and animation libraries
const scene = new SceneDom('anim')
const testLibrary = scene.createLibrary('test', '../assets/test')


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
        scene.current.appendChild(shellInput)
    }else if(swap && item.name=="stardude_assets/StarGuyGun"){
        scene.current.appendChild(gunInput)
    }else{
        item.draw(frame, lerp, drawWithLogic)
    }
}

function update(){
    if(play){
        scene.clear();

        scene.pushTranslate('0px', '10px')
        scene.pushScale('1', '1')
        scene.pushRotation('0deg')
        testLibrary.symbol("StarDude").draw(frame, false, drawWithLogic)
        scene.pop();
        scene.pop();
        scene.pop();

        scene.pushTranslate('100px', '10px')
        scene.pushScale('1', '1')
        scene.pushRotation('0deg')
        testLibrary.symbol("Walker_Laser_Rotating").draw(frame, false, drawWithLogic)
        scene.pop();
        scene.pop();
        scene.pop();

        frame += 1;
    }

    requestAnimationFrame(update)
}




init();
