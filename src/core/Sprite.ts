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


    public getPixel(x:Float, y:Float, transform:DOMMatrix){
        const point = new DOMPoint(x, y)
        const imatrix = transform.inverse()
        const local = point.matrixTransform(imatrix)

        if(local.x<0 || local.x>=this.width) return null;
        if(local.y<0 || local.y>=this.height) return null;

        return this.atlas.getPixel(this.x + local.x, this.y + local.y)
    }


    public isSolidPixelAt(x:Float, y:Float, transform:DOMMatrix, alphaThreshold:number = 1){
        const pixel = this.getPixel(x, y, transform)
        return pixel && pixel[3] > alphaThreshold
    }


    public draw(frame:Float, lerp?:boolean, callback?:(item:Drawable, frame:Float, lerp?:boolean)=>void){
        this.scene.drawImage(this.atlas.image, this.x, this.y, this.width, this.height, 0, 0, this.width, this.height)
    }

}
