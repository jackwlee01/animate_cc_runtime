package animation;

#if kha
class Vec3 extends kha.math.Vector3{
    
}
#else
class Vec3 {
    public var x:Float;
    public var y:Float;
    public var z:Float;
    public function new(){}
}
#end