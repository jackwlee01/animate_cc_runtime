type Float = number;


export class Vec2 {
    x:Float;
    y:Float;

    constructor(props:{x:Float, y:Float}){
        this.x = props.x;
        this.y = props.y;
    }
    
}


export class Vec3 extends Vec2{
    z:Float;

    constructor(props:{x:Float, y:Float, z:Float}){
        super(props);
        this.z = props.z;
    }

}

/*
export class Matrix{
    _00:Float;
    _10:Float;
    _20:Float;
    _01:Float;
    _11:Float;
    _21:Float;

    
    constructor(props:null|{ _00:Float, _10:Float, _20:Float, _01:Float, _11:Float, _21:Float}){
        if(props==null){
            this._00 = 1.0; this._10 = 0.0; this._20 = 0.0; 
            this._01 = 0.0; this._11 = 1.0; this._21 = 0.0;
        }else{
            this._00 = props._00;
            this._10 = props._10;
            this._20 = props._20;
            this._01 = props._01;
            this._11 = props._11;
            this._21 = props._21;
        }
    }

}
*/