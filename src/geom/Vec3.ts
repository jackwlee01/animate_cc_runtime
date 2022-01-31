import { Float } from "../types/Float"

export class Vec3{

    x:Float
    y:Float
    z:Float
    data:Float32Array

    
    constructor(props:{x:Float, y:Float, z:Float}){
        this.x = props.x
        this.y = props.y
        this.z = props.z
        this.data = new Float32Array([this.x, this.y, this.z])
    }

}