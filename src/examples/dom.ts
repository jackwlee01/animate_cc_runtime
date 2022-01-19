import { DomAnimationContext } from "../DomAnimationContext";

// Set up animation context and animation libraries
const animContext = new DomAnimationContext('anim')
const testLibrary = animContext.createLibrary('test', './test')


async function init(){
    await testLibrary.loadData();
    update();
}

let frame = 0;
    
function update(){
    
    animContext.clear();
    testLibrary.symbol("StarDude").draw(frame)
    frame++;

    requestAnimationFrame(update)
}


init();
