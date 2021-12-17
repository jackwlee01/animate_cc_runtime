package animation;


class Atlas{

    public var sprites = new Map<String, Sprite>();
    public var image:Image;

    public var app:String;
    public var version:String;
    public var imagePath:String;
    public var format:String;
    public var size = new Size();
    public var resolution:String;

    public function new(){}


    public static function fromJson(image:Image, json:animation.json.SpriteMapJson, library:Library){
        var data = new Atlas();

        data.image = image;
        data.app = json.meta.app;
        data.version = json.meta.version;
        data.imagePath = json.meta.image;
        data.format = json.meta.format;
        data.size.h = json.meta.size.h;
        data.size.w = json.meta.size.w;
        data.resolution = json.meta.resolution;


        for(sprite in json.ATLAS.SPRITES){
            var spriteData = new Sprite(library);
            spriteData.name = sprite.SPRITE.name;
            spriteData.x = sprite.SPRITE.x;
            spriteData.y = sprite.SPRITE.y;
            spriteData.w = sprite.SPRITE.w;
            spriteData.h = sprite.SPRITE.h;
            spriteData.rotated = sprite.SPRITE.rotated;
            spriteData.atlas = data;
            spriteData.id = spriteData.name;
            data.sprites[sprite.SPRITE.name] = spriteData;
            library.addDrawable(spriteData);
        }

        return data;
    }

}
