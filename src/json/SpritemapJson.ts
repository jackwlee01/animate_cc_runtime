type Float = number;
type Int = number;


type Sprite = {
    sprite:{
        name:string,
        x:Float,
        y:Float,
        w:Float,
        h:Float,
        rotated:boolean
    }
}


type SpriteType = {
    sprite:Sprite;
}


type Atlas = {
    Sprites:Array<Sprite>;
}


type Size = {
    w:Float;
    h:Float;
}


type Meta = {
    app:string;
    version:string;
    image:string;
    format:string;
    size:Size;
    resolution:string;
}


type SpriteMapJson = {
    atlas:Atlas;
    meta:Meta;
}

