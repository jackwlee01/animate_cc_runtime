package animation;


class Instance extends Drawable{
    
    public var matrix = Matrix.identity();
    public var decomposedMatrix = new DecomposedMatrix();
    public var transformationPoint = new Point();
    public var element:Element;
    public var elementName:String;
    public var frame:Frame;
    public var filters = new Array<Filter>();
    public var firstInstance:Instance;
    public var index:Int;

    
    public function new(frame:Frame, library:Library, index:Int){
        super(library);
        this.frame = frame;
        this.index = index;
    }


    public function setFilters(json:Dynamic){
        if(json == null) return;
        var filterTypes = Reflect.fields(json);
        for(filterType in filterTypes){
            var filter = Reflect.field(json, filterType);
            var result = switch(filterType){
                case 'AdjustColorFilter': Filter.AdjustColor(filter.hue, filter.saturation, filter.brightness, filter.contrast);
                default: null; 
            }
            if(result != null) filters.push(result);
        }
    }

    #if kha
    override public function draw<T>(buffer:kha.Canvas, position:Float=0, item:T=null, callback:(buffer:kha.Canvas,position:Float,item:Dynamic,drawable:Drawable)->Void = null){
        buffer.g2.pushTransformation(buffer.g2.transformation.multmat(matrix));

        switch(element){
            case Sprite(spriteInstance):{
                if(callback != null){
                    callback(buffer, position, item, spriteInstance.sprite);
                }else{
                    spriteInstance.sprite.draw(buffer, position, item);
                }
            }
            case Symbol(symbolInstance):{
                var symbol = symbolInstance.symbol;
                position = switch(symbolInstance.symbolType){
                    case Graphic: symbolInstance.firstFrame;
                    case MovieClip: position;
                }
                if(symbolInstance.color!=null) buffer.g2.pushOpacity(buffer.g2.opacity * symbolInstance.color.alphaMultiplier);
                if(callback != null){
                    callback(buffer, position, item, symbol);
                }else{
                    symbol.draw(buffer, position, item);
                }
                if(symbolInstance.color!=null) buffer.g2.popOpacity();
            }
        }
    
        buffer.g2.popTransformation();
    }


    override public function visit<T>(buffer:kha.Canvas, position:Float, item:T, callback:(buffer:kha.Canvas, item:T, drawable:Drawable, position:Float)->Void){
        callback(buffer, item, this, position);
        switch(element){
            case Sprite(spriteInstance):{
                spriteInstance.sprite.visit(buffer, position, item, callback);
            }
            case Symbol(symbolInstance):{
                symbolInstance.symbol.visit(buffer, position, item, callback);
            }
        }
    }
    #end


}
