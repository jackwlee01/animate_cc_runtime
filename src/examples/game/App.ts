import { Canvas2dScene } from "../../Canvas2dScene";
import { setupCanvas } from "../example-utils";
import { Game } from "./game/Game";
import { Input } from "./Input";
import { Libs } from "./Libs";


export class App{

    dpr:number

    scene:Canvas2dScene
    libs:Libs
    input:Input
    game:Game|null


    constructor(ctx2d:CanvasRenderingContext2D){
        this.dpr = setupCanvas(ctx2d.canvas) // Device pixel ratio
        this.scene = new Canvas2dScene(ctx2d)
        this.libs = new Libs(this, this.scene)
        this.input = new Input(this)
        this.game = null

        this.load()
        this.update()
    }


    load = async () => {
        await this.libs.load()
        this.game = new Game(this)
    }
    


    update = () => {
        if(!!this.game) this.game.update()
        this.draw()

        this.input.postupdate();
        requestAnimationFrame(this.update.bind(this))
    }


    draw = () => {
        this.scene.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        if(this.game) this.game.draw(this.scene)
    }


    get canvas(){
        return this.scene.ctx.canvas
    }

}
