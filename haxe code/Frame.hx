package animation;


class Frame extends Drawable{

    public var index:Int;
    public var labelName:String;
    public var duration:Int;
    public var layer:Layer;
    public var instances = new Array<Instance>();


    public function new(layer:Layer, library:Library){
        super(library);
        this.layer = layer;
    }


    public function getInstanceAsSymbol(){
        return switch(instances[0].element){
            case Symbol(symbolInstance): return symbolInstance;
            default: throw("Not a symbol in layer: " + layer.name + " for frame: " + index);
        }
    }  

    #if kha
    override public function draw<T>(buffer:kha.Canvas, position:Float=0, item:T=null, callback:(buffer:kha.Canvas,position:Float,item:Dynamic,drawable:Drawable)->Void = null){
        for(instance in instances){
            if(callback != null){
                callback(buffer, position, item, instance);
            }else{
                instance.draw(buffer, position, item);
            }
        }
    }


    override public function visit<T>(buffer:kha.Canvas, position:Float, item:T, callback:(canvas:kha.Canvas, item:T, drawable:Drawable, position:Float)->Void){
        callback(buffer, item, this, position);
        for(instance in instances){
            instance.visit(buffer, position, item, callback);
        }
    }
    #end


    public static function fromJson(layerData:Layer, library:Library, frame:animation.json.AnimationJson.Frame){
        var frameData = new Frame(layerData, library);
        frameData.index = frame.index;
        frameData.duration = frame.duration;
        frameData.name = layerData.name + frameData.index;
        frameData.id = layerData.id + "--" + frameData.index;
        frameData.labelName = frame.name;

        for(element in frame.elements){
            if(element.atlasSpriteInstance != null){
                frameData.instances.push(AtlasSpriteInstance.fromJson(frameData, library, element, frameData.instances.length));
            }else if(element.symbolInstance != null){
                frameData.instances.push(SymbolInstance.fromJson(frameData, library, element, frameData.instances.length));
            }else{
                throw("Unsupported instance type");
            }
        }
        library.addDrawable(frameData);
        return frameData;
    }


    public function visibleOn(position:Float){
        var position = Util.modWrap(position, layer.symbol.totalFrames);
        return index<=position && index+duration > position;
    }

}

