package animation;


class Symbol extends Drawable{

    public var layers = new Array<Layer>();
    public var layersById = new Map<String, Layer>();
    public var layersByName = new Map<String, Layer>();
    public var framesByName = new Map<String, Frame>();

    private static var randomId = 0;
    

    public function getTotalFramesByLayers(){
        var result = 0.0;
        for(layer in layers) if(layer.totalFrames > result) result = layer.totalFrames;
        return result;
    }

    #if kha
    override public function draw<T>(buffer:kha.Canvas, position:Float=0, item:T=null, callback:(buffer:kha.Canvas,position:Float,item:Dynamic,drawable:Drawable)->Void = null){
        for(layer in layers){
            if(callback != null){
                callback(buffer, position, item, layer);
            }else{
                layer.draw(buffer, position, item);
            }
        }
    }
    
    override public function visit<T>(buffer:kha.Canvas, position:Float, item:T, callback:(buffer:kha.Canvas, item:T, drawable:Drawable, position:Float)->Void){
        callback(buffer, item, this, position);
        for(layer in layers){
            layer.visit(buffer, position, item, callback);
        }
    }
    #end


    public static function fromJson(library:Library, name:String, timeline:animation.json.AnimationJson.Timeline){
        var symbolData = new Symbol(library);
        symbolData.name = name;
        symbolData.id = (name!=null&&name!="") ? name : ""+randomId++;
        symbolData.layers = new Array<Layer>();
        for(layer in timeline.layers){
            var layerData = Layer.fromJson(symbolData, library, layer);
            symbolData.layers.unshift(layerData);
            symbolData.layersById[layerData.id] = layerData;
            symbolData.layersByName[layerData.name] = layerData;
        }
        symbolData.totalFrames = symbolData.getTotalFramesByLayers();
        
        library.addDrawable(symbolData);
        return symbolData;
    }

}
