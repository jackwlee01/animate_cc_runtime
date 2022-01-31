import { App } from "./App";


export class Input{

    app:App
    keys:Keys
    mouse:Mouse


    constructor(app:App){
        this.app = app
        this.keys = new Keys(this)
        this.mouse = new Mouse(this)
    }


    postupdate = () => {
        this.keys.postUpdate()
        this.mouse.postUpdate()
    }

}


class Mouse{

    input:Input
    private buttonsDown:Array<boolean>
    private buttonsReleased:Array<boolean>
    private buttonsPressed:Array<boolean>


    constructor(input:Input){
        this.input = input
        this.buttonsDown = []
        this.buttonsPressed = []
        this.buttonsReleased = []

        input.app.scene.canvas.addEventListener('mousedown', (e)=> {
            this.buttonsDown[e.button] = true
            this.buttonsPressed[e.button] = true
        })

        input.app.scene.canvas.addEventListener('mouseup', (e) => {
            this.buttonsDown[e.button] = false
            this.buttonsReleased[e.button] = true
        })
    }


    postUpdate = () => {
        for(let i=0; i<this.buttonsReleased.length; i++) this.buttonsReleased[i] = false;
        for(let i=0; i<this.buttonsPressed.length; i++) this.buttonsPressed[i] = false;
    }


    get x(){
        return this.input.app.scene.mouseX
    }


    get y(){
        return this.input.app.scene.mouseY
    }

}


class Keys{

    input:Input
    private keysDown:Record<string, boolean>
    private keysReleased:Record<string, boolean>
    private keysPressed:Record<string, boolean>


    constructor(input:Input){
        this.input = input;
        this.keysDown = {}
        this.keysReleased = {}
        this.keysPressed = {}

        document.addEventListener('keydown', (e) => {
            this.keysDown[e.code] = true
            this.keysPressed[e.code] = true
        })

        document.addEventListener('keyup', (e) => {
            this.keysDown[e.code] = false;
            this.keysReleased[e.code] = true
        })
    }


    postUpdate = () => {
        Object.keys(this.keysPressed).forEach(code => this.keysPressed[code]=false)
        Object.keys(this.keysReleased).forEach(code => this.keysReleased[code]=false)
    }


    down = (code:string) => {
        return !!this.keysDown[code]
    }


    pressed = (code:string) => {
        return !!this.keysPressed[code]
    }


    released = (code:string) => {
        return !!this.keysReleased[code]
    }


}