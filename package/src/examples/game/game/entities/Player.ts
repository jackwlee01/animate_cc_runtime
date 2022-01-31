import { Canvas2dScene } from "../../../../Canvas2dScene";
import { Clip } from "../../../../core/Clip";
import { Game } from "../Game";

const FRICTION = 0.3
const MAX_SPEED = 10.0
const ACCEL = 2.0


export class Player{

    game:Game
    lapsed = 0;
    pos = { x:100, y:200 }
    vel = { x:0, y:0 }
    facing = 1
    state = 'static'

    
    constructor(game:Game){
        this.game = game
    }


    changeState(state:string){
        this.state = state
        this.lapsed = 0
    }


    get symbol(){
        return this.game.libs.test.symbol('GunnerOld')
    }


    get stateFrame(){
        return (this.symbol as Clip).framesByLabel[this.state]
    }


    update = () => {
        this.lapsed += 1 + Math.abs(this.vel.x/10);

        this.vel.x *= 1-FRICTION
        this.vel.y *= 1-FRICTION

        if(this.game.input.keys.down('ArrowLeft')) this.vel.x = Math.max(-MAX_SPEED, this.vel.x-ACCEL)
        if(this.game.input.keys.down('ArrowRight')) this.vel.x = Math.min(MAX_SPEED, this.vel.x+ACCEL)

        if(this.vel.x > 0 && this.facing < 0) this.facing *= -1
        if(this.vel.x < 0 && this.facing > 0) this.facing *= -1

        this.pos.x += this.vel.x
        this.pos.y += this.vel.y

        if(Math.abs(this.vel.x)>1 && this.state!='walk') this.changeState('walk')
        if(Math.abs(this.vel.x)<=1 && this.state!='static') this.changeState('static')
        
    }


    draw = (scene:Canvas2dScene) =>{
        scene.ctx.save()    
            scene.ctx.translate(this.pos.x, this.pos.y)
            scene.ctx.scale(this.facing*-2, 2)
            scene.draw(this.symbol, this.stateFrame.index + (this.lapsed%this.stateFrame.totalFrames))
        scene.ctx.restore()
    }

}