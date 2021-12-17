package animation;

#if kha
typedef Matrix = kha.math.FastMatrix3;
#else
class Matrix{

    public var _00:Float;
    public var _10:Float;
    public var _20:Float;
    public var _01:Float;
    public var _11:Float;
    public var _21:Float;

    public function new(){}

    public static function  identity():Matrix{
        var matrix = new Matrix();
        return matrix;
    }
}
#end