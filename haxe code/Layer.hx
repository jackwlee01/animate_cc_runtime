package animation;


class Layer extends Drawable{

    public var frames = new Array<Frame>();
    public var framesByName = new Map<String, Frame>();
    public var labels = new Array<Frame>();
    public var symbol:Symbol;


    public function new(symbol:Symbol, library:Library){
        super(library);
        this.symbol = symbol;
    }


    public function frameAt(position:Float){
        position = Util.modWrap(position, totalFrames);
        
        for(frame in frames){
            if(position >= frame.index && position < frame.index+frame.duration){
                return frame;
            }
        }
        return null;
    }

    #if kha
    override public function draw<T>(buffer:kha.Canvas, position:Float=0, item:T=null, callback:(buffer:kha.Canvas,position:Float,item:Dynamic,drawable:Drawable)->Void = null){
            var frame = frameAt(position);
            if(frame == null) return;
            if(callback != null){
                callback(buffer, position, item, frame);
            }else{
                frame.draw(buffer, position, item);
            }
    }


    override public function visit<T>(buffer:kha.Canvas, position:Float, item:T, callback:(buffer:kha.Canvas, item:T, drawable:Drawable, position:Float)->Void){
        callback(buffer, item, this, position);
        var frame = frameAt(position);
        if(frame == null) return;
        frame.visit(buffer, position, item, callback);
    }
    #end


    public static function fromJson(symbol:Symbol, library:Library, layer:animation.json.AnimationJson.Layer){
        var layerData = new Layer(symbol, library);
        layerData.name = layer.layerName;
        layerData.id = symbol.id + "--" + symbol.layers.length;
        
        if(layer.frames.length > 0){
            layerData.totalFrames = layer.frames[layer.frames.length-1].index + layer.frames[layer.frames.length-1].duration;
        }else{
            layerData.totalFrames = 0;
        }

        for(frame in layer.frames){
            var frame = Frame.fromJson(layerData, library, frame);
            if(frame.labelName!=null) layerData.framesByName[frame.labelName] = frame;
            if(frame.labelName!=null) layerData.labels.push(frame);
             layerData.frames.push(frame);
        }
        library.addDrawable(layerData);
        return layerData;
    }

}