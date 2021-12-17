package animation;


enum DrawableType {
    Sprite(item:Sprite);
    Instance(item:Instance);
    Frame(item:Frame);
    Layer(item:Layer);
    Symbol(item:Symbol);
}


class Drawable{
    
    public var name:String;
    public var id:String;
    public var totalFrames:Float = 1;
    public var library:Library;

    public var type:DrawableType;


    public function new(library:Library){
        this.library = library;

        type = if(Std.isOfType(this, animation.Sprite)) Sprite(cast this);
        else if(Std.isOfType(this, animation.Frame)) Frame(cast this);
        else if(Std.isOfType(this, animation.Instance)) Instance(cast this);
        else if(Std.isOfType(this, animation.Layer)) Layer(cast this);
        else if(Std.isOfType(this, animation.Symbol)) Symbol(cast this);
        else throw("This shouldn't happen, " + Type.getClassName(Type.getClass(this)));
    }

    #if kha
    public function draw<T>(buffer:kha.Canvas, position:Float=0, item:T=null, callback:(buffer:kha.Canvas,position:Float,item:Dynamic,drawable:Drawable)->Void = null){}
    public function visit<T>(buffer:kha.Canvas, position:Float, item:T, callback:(buffer:kha.Canvas, item:T, drawable:Drawable, position:Float)->Void){}
    #end

}