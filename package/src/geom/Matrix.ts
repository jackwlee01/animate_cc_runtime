import { Float } from "../types/Float";

export class Matrix{

    _00:Float; _01:Float; _02:Float; _03:Float;
    _10:Float; _11:Float; _12:Float; _13:Float;
    _20:Float; _21:Float; _22:Float; _23:Float;
    _30:Float; _31:Float; _32:Float; _33:Float;

    data:Float32Array


    constructor(
        _00:Float, _01:Float, _02:Float, _03:Float,
        _10:Float, _11:Float, _12:Float, _13:Float,
        _20:Float, _21:Float, _22:Float, _23:Float,
        _30:Float, _31:Float, _32:Float, _33:Float,
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