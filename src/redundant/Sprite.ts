import { Drawable } from "./Drawable";
import { Library } from "./Library";
import { Atlas } from "./Atlas";

type Int = number;
type Float = number;


export class Sprite extends Drawable{
    x:Float;
    y:Float;
    w:Float;
    h:Float;
    rotated:boolean;
    atlas:Atlas;

    constructor(props:{library:Library, name:string, id:string, totalFrames:Int, x:Float, y:Float, w:Float, h:Float, rotated:boolean, atlas:Atlas}){
        super(props)
        this.x = props.x;
        this.y = props.y;
        this.w = props.w;
        this.h = props.h;
        this.rotated = props.rotated;
        this.atlas = props.atlas;
        this.atlas.addSprite(this);
    }

    /*
    #if kha
    override public function draw<T>(buffer:kha.Canvas, position:Float=0, item:T=null, callback:(buffer:kha.Canvas,position:Float,item:Dynamic,drawable:Drawable)->Void = null){
        buffer.g2.drawSubImage(atlas.image, 0, 0, x, y, w, h);
    }


    override public function visit<T>(buffer:kha.Canvas, position:Float, item:T, callback:(canvas:kha.Canvas, item:T, drawable:Drawable, position:Float)->Void){
        callback(buffer, item, this, position);
    }
    #end
    */

}
