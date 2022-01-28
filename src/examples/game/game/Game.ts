import { Canvas2dScene } from "../../../Canvas2dScene"
import { App } from "../App"
import { Enemy } from "./entities/Enemy"
import { Player } from "./entities/Player"


export class Game{

    app:App
    player:Player|null
    enemies:Enemy[]


    constructor(app:App){
        this.app = app
        this.player = new Player(this)
        this.enemies = []
    }


    get input(){ return this.app.input }
    get libs() { return this.app.libs }


    update = () => {
        if(this.player) this.player.update()
    }


    draw = (scene:Canvas2dScene) => {
        if(this.player) this.player.draw(scene)
    }

}


