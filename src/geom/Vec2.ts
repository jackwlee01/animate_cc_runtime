import { Float } from "../types/Float"

export class Vec2 {

    x:Float
    y:Float
    data:Float32Array

    
    constructor(props:{x:Float, y:Float}){
        this.x = props.x
        this.y = props.y
        this.data = new Float32Array([this.x, this.y])
    }
    
}