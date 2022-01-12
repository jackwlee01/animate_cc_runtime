import { Drawable } from "./Drawable";
import { Atlas } from "./Atlas";
import { DrawableProps } from "./Drawable"

type Int = number;
type Float = number;


export type SpriteProps = Omit<DrawableProps, 'totalFrames'|'library'|'id'> & {
    x:Float,
    y:Float,
    width:Float,
    height:Float,
    rotated:boolean,
    atlas:Atlas,
}


export class Sprite extends Drawable{
    x:Float;
    y:Float;
    width:Float;
    height:Float;
    rotated:boolean;
    atlas:Atlas;

    constructor(props:SpriteProps){
        super({
            ...props,
            totalFrames:1,
            library:props.atlas.library,
            id:`${props.atlas.library.name}.sprites.${props.name}`
        })
        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height = props.height;
        this.rotated = props.rotated;
        this.atlas = props.atlas;
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
