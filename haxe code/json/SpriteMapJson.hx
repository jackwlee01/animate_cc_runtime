package animation.json;


typedef SPRITE = {
    var SPRITE:{
        name:String,
        x:Float,
        y:Float,
        w:Float,
        h:Float,
        rotated:Bool
    }
}


typedef SPRITE_TYPE = {
    var SPRITE:SPRITE;
}


typedef ATLAS = {
    var SPRITES:Array<SPRITE>;
}


typedef Size = {
    var w:Float;
    var h:Float;
}


typedef Meta = {
    var app:String;
    var version:String;
    var image:String;
    var format:String;
    var size:Size;
    var resolution:String;
}


typedef SpriteMapJson = {
    var ATLAS:ATLAS;
    var meta:Meta;
}

