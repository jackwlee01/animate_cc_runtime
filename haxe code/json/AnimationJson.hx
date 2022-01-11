package animation.json;

using Std;

typedef Matrix3D = {
    var m00:Float;
    var m01:Float;
    var m02:Float;
    var m03:Float;
    var m10:Float;
    var m11:Float;
    var m12:Float;
    var m13:Float;
    var m20:Float;
    var m21:Float;
    var m22:Float;
    var m23:Float;
    var m30:Float;
    var m31:Float;
    var m32:Float;
    var m33:Float;
}


typedef Position = {
    var x:Float;
    var y:Float;
    var z:Float;
}


typedef Rotation = {
    var x:Float;
    var y:Float;
    var z:Float;
}


typedef Scaling = {
    var x:Float;
    var y:Float;
    var z:Float;
}


typedef DecomposedMatrix = {
    var position:Position;
    var rotation:Rotation;
    var scaling:Scaling;
}



typedef TransformationPoint = {
    var x:Float;
    var y:Float;
}


typedef Color = {
    var mode:String;
    var alphaMultiplier:Float;
}


typedef AtlasSpriteInstance = {
    var name:String;
    var matrix3D?:Matrix3D;
    var decomposedMatrix:DecomposedMatrix;
    @:options var filters:Dynamic;
}


typedef SymbolInstance = {
    var symbolName:String;
    var instanceName:String;
    var symbolType:String;
    var transformationPoint:Point;
    var matrix3D:Matrix3D;
    var decomposedMatrix:DecomposedMatrix;
    var loop:String;
    @:optional var filters:Dynamic;
    @:optional var firstFrame:Float;
    @:optional var color:Color;
}


typedef Element = {
    var atlasSpriteInstance:AtlasSpriteInstance;
    var symbolInstance:SymbolInstance;
}


typedef Frame = {
    var index:Int;
    var duration:Int;
    var elements:Array<Element>;
    @:optional var name:String;
}


typedef Layer = {
    var layerName:String;
    var frames:Array<Frame>;
}


typedef Timeline = {
    var layers:Array<Layer>;
}


typedef Animation = {
    var name:String;
    var symbolName:String;
    var timeline:Timeline;
}


typedef Symbol = {
    var symbolName:String;
    var timeline:Timeline;
}


typedef SymbolDictionary = {
    var symbols:Array<Symbol>;
}


typedef Metadata = {
    var framerate:Float;
}


typedef AnimationJson = {
    var animation:Animation;
    var symbolDictionary:SymbolDictionary;
    var metadata:Metadata;
}


class AnimationJsonKeys{

    public static function normalise(data:Any):Dynamic{
        if(data.isOfType(String) || data.isOfType(Float) || data.isOfType(Int) || data.isOfType(Bool)){
            return data;
        }else if(data.isOfType(Array)){
            var asArray:Array<Dynamic> = cast data;
            return [for(item in asArray) Std.isOfType(item, Dynamic) ? normalise(item) : item];
        }else{
            var result:Dynamic = {};
            for(key in Reflect.fields(data)){
                var value = Reflect.field(data, key);
                Reflect.setField(result, getKey(key), normalise(value));
            }
            return result;
        }
    }


    inline private static function getKey(key:String){
        return Reflect.hasField(keys, key) ? Reflect.field(keys, key) : key;
    }

    
    private static var keys = {
        // fix inconsistent names
        ANIMATION: "animation",
        ATLAS_SPRITE_instance: "atlasSpriteInstance",
        DecomposedMatrix: "decomposedMatrix",
        Frames: "frames",
        framerate: "frameRate",
        Instance_Name: "instanceName",
        Layer_name: "layerName",
        LAYERS: "layers",
        Matrix3D: "matrix3D",
        Position: "position",
        Rotation: "rotation",
        Scaling: "scaling",
        SYMBOL_DICTIONARY: "symbolDictionary",
        SYMBOL_Instance: "symbolInstance",
        SYMBOL_name: "symbolName",
        Symbols: "symbols",
        TIMELINE: "timeline",

        /* Not yet supported
        // fix shortened names

        AN: "animation",
        AM: "alphaMultiplier",
        ASI: "atlasSpriteInstance",
        BM: "bitmap",
        C: "color",
        DU: "duration",
        E: "elements",
        FF: "firstFrame",
        FR: "frames",
        FRT: "frameRate",
        I: "index",
        IN: "instanceName",
        L: "layers",
        LN: "layerName",
        LP: "loop",
        M3D: "matrix3D",
        MD: "metadata",
        M: "mode",
        N: "name",
        POS: "position",
        S: "symbols",
        SD: "symbolDictionary",
        SI: "symbolInstance",
        SN: "symbolName",
        ST: "symbolType",
        TL: "timeline",
        TRP: "transformationPoint"
        */
    };
}