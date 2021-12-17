package animation;


class Sprite extends Drawable{
    
    public var x:Float;
    public var y:Float;
    public var w:Float;
    public var h:Float;
    public var rotated:Bool;
    public var atlas:Atlas;

    #if kha
    override public function draw<T>(buffer:kha.Canvas, position:Float=0, item:T=null, callback:(buffer:kha.Canvas,position:Float,item:Dynamic,drawable:Drawable)->Void = null){
        buffer.g2.drawSubImage(atlas.image, 0, 0, x, y, w, h);
    }


    override public function visit<T>(buffer:kha.Canvas, position:Float, item:T, callback:(canvas:kha.Canvas, item:T, drawable:Drawable, position:Float)->Void){
        callback(buffer, item, this, position);
    }
    #end

}
