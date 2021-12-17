package animation;

class AnimationData {

    public var root:Symbol;
    public var symbols = new Map<String, Symbol>();
    public var framerate:Float;
    public function new(){}


    public static function fromJson(library:Library, json:animation.json.AnimationJson){
        json = animation.json.AnimationJson.AnimationJsonKeys.normalise(json);
        var data = new AnimationData();
    
        data.framerate = json.metadata.framerate;

        for(symbol in json.symbolDictionary.symbols){
            var symbolData = Symbol.fromJson(library, symbol.symbolName, symbol.timeline);
            data.symbols[symbolData.name] = symbolData;
        }

        var root = Symbol.fromJson(library, json.animation.symbolName, json.animation.timeline);
        data.root = root;

        for(symbol in data.symbols){
            for(layer in symbol.layers){
                for(frame in layer.frames){
                    for(instance in frame.instances){
                        switch(instance.element){
                            case Sprite(spriteInstance):{
                                spriteInstance.sprite = library.spritesById[instance.name];
                                if(spriteInstance.sprite == null || spriteInstance.sprite.atlas==null) throw("Null");
                            }
                            case Symbol(symbolInstance):{
                                symbolInstance.symbol = data.symbols[symbolInstance.symbolName];
                                if(symbolInstance.symbol == null) throw("Null");
                            }
                        }
                    }
                }
            }
        }

        return data;
    }


    

}
