
export class Matrix{

    _00:number; _01:number; _02:number; _03:number;
    _10:number; _11:number; _12:number; _13:number;
    _20:number; _21:number; _22:number; _23:number;
    _30:number; _31:number; _32:number; _33:number;

    data:Float32Array


    constructor(
        _00:number, _01:number, _02:number, _03:number,
        _10:number, _11:number, _12:number, _13:number,
        _20:number, _21:number, _22:number, _23:number,
        _30:number, _31:number, _32:number, _33:number,
    ){
        this._00=_00; this._01=_01; this._02=_02; this._03=_03; 
        this._10=_10; this._11=_11; this._12=_12; this._13=_13; 
        this._20=_20; this._21=_21; this._22=_22; this._23=_23; 
        this._30=_30; this._31=_31; this._32=_32; this._33=_33; 
        
        this.data = new Float32Array([
            _00, _01, _02, _03,
            _10, _11, _12, _13,
            _20, _21, _22, _23,
            _30, _31, _32, _33,
        ])
    }

}