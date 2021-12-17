package animation;

import haxe.io.Bytes;
import animation.json.AnimationJson.AnimationJsonKeys;
import animation.json.SpriteMapJson;
import haxe.Json;


class Library{

    public var root:Symbol;
    public var symbols = new Map<String, Symbol>();
    public var framerate:Float;

    public var sprites = new Array<Atlas>();
    public var spritesById = new Map<String, Sprite>();
    public var atlases = new Array<Image>();
    public var drawablesById = new Map<String, Drawable>();

    public var name:String;
    public var path:String;


    public function new(name:String, path:String){
        this.name = name;
        this.path = path;
    }


    public function addDrawable(drawable:Drawable){
        drawablesById[drawable.id] = drawable;
    }


    public function allSymbolNames():Array<String>{
        var result = [];
        for(key in symbols.keys()){
            result.push(key);
        }
        return result;
    }


    public function drawable(id:String):Drawable{
        if(drawablesById.exists(id) == false) throw("Could not find drawable with id: " + id);
        return drawablesById[id];
        //if(spritesById.exists(id)) return spritesById[id];
        //else if(symbols.exists(id)) return symbols[id];
        //throw("Could not find drawable with id: " + id + " for library at path: " + path);
    }


    public function symbol(id:String):animation.Symbol{
        if(symbols.exists(id)) return symbols[id];
        throw("Could not find symbol with id: " + id + " for library at path: " + path);
    }


    public function fromJson(animationJson:animation.json.AnimationJson, spriteMapJsonArray:Array<animation.json.SpriteMapJson>){
        // Sprites
        for(spriteMapJson in spriteMapJsonArray){
            var atlasIndex = spriteMapJsonArray.indexOf(spriteMapJson);
            var image = getAtlas(atlasIndex+1);
            var spriteMapData = Atlas.fromJson(image, spriteMapJson, this);

            for(sprite in spriteMapData.sprites){
                spritesById[sprite.name] = sprite;
            }

            sprites.push(spriteMapData);
            atlasIndex++;
        }

        // Animation
        framerate = animationJson.metadata.framerate;
        
        for(symbol in animationJson.symbolDictionary.symbols){
            var symbolData = Symbol.fromJson(this, symbol.symbolName, symbol.timeline);
            symbols[symbolData.name] = symbolData;
        }

        root = Symbol.fromJson(this, animationJson.animation.symbolName, animationJson.animation.timeline);
        
        for(symbol in symbols){
            for(layer in symbol.layers){
                for(frame in layer.frames){
                    for(instance in frame.instances){
                        switch(instance.element){
                            case Sprite(spriteInstance):{
                                spriteInstance.sprite = spritesById[instance.name];
                                if(spriteInstance.sprite == null || spriteInstance.sprite.atlas==null) throw("Null: " + instance.name);
                            }
                            case Symbol(symbolInstance):{
                                symbolInstance.symbol = symbols[symbolInstance.symbolName];
                                if(symbolInstance.symbol == null) throw("Null: " + instance.name);
                            }
                        }
                    }
                }
            }
        }
    }


    public function getSpriteMapJson(bytes:Bytes):SpriteMapJson{
        // HACK: Somtimes Animate CC saves the json file as a a UTF8 with BOM.
        // If the json parse fails, assume it because the BOM is present, and
        // chop it off.
        // https://haxe.motion-twin.narkive.com/oZVfeQ48/hss-1-invalid-character-0xef
        try{
            var text = bytes.getString(0, bytes.length, UTF8);
            return cast Json.parse(text);
        }catch(e){
            var text = bytes.getString(3, bytes.length-3, UTF8);
            return cast Json.parse(text);
        }
    }

    
    public function getAnimationJson():animation.json.AnimationJson{
        #if kha
        var bytesPath = path + "_Animation_json";
        var bytes = kha.Assets.blobs.get(bytesPath).bytes;
        #elseif sys
        var bytesPath = path + "/Animation.json";
        var bytes = sys.io.File.getBytes(bytesPath);
        #else
        throw("Not implemented");
        #end
        var obj = Json.parse(bytes.getString(0, bytes.length, UTF8));
        return cast AnimationJsonKeys.normalise(obj);
    }


    public function getSpriteMapJsonPaths(){
        var index = 1;
        var paths = new Array<String>();
        while(true){
            #if kha
            var bytesPath = path + "_spritemap" + index + "_json";
            if(kha.Assets.blobs.get(bytesPath) == null) return paths;
            #elseif sys
            var bytesPath = path + "/spritemap" + index + ".json";
            if(sys.FileSystem.exists(bytesPath) == null) return paths;
            #else
            throw("Not implemented");
            #end
            else paths.push(bytesPath);
            index++;
            break;
        }

        return paths;
    }

    
    public function fromPath(){
        var spriteMapPaths = getSpriteMapJsonPaths();
        #if kha
        var bytesArr = Lambda.map(spriteMapPaths, path -> kha.Assets.blobs.get(path).bytes);
        #elseif sys
        var bytesArr = Lambda.map(spriteMapPaths, sys.io.File.getBytes);
        #end
        var spriteMapJsonArray = Lambda.map(bytesArr, getSpriteMapJson);
        var animationJson = getAnimationJson();
        fromJson(animationJson, spriteMapJsonArray);
    }


    public function getAtlas(index:Int):Image{
        #if kha
        var imagePath = path + "_spritemap" + index;
        return kha.Assets.images.get(imagePath);
        #else
        var imagePath = path + "/spritemap" + index;
        return null;
        #end
    }

}
