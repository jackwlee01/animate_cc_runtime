
export class Matrix2d{

    a:number
    b:number
    c:number
    d:number
    e:number
    f:number
    data:Float32Array


    constructor(a:number, b:number, c:number, d:number, e:number, f:number){
        this.a = a
        this.b = b
        this.c = c
        this.d = d
        this.e = e
        this.f = f
        
        this.data = new Float32Array([this.a, this.b, this.c, this.d, this.e, this.f])
    }

}