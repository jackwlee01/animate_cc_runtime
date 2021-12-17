package animation;

class Util{

	inline public static function modWrap(a:Float, b:Float){
		return a - b * Math.floor(a/b);
	}

}