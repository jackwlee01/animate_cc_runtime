import { AnimationContext } from "./core/AnimationContext"
import { Drawable } from "./core/Drawable"
import { Instance } from "./core/Instance"
import { Sprite } from "./core/Sprite"


export class Canvas2dAnimationContext extends AnimationContext{
    
    ctx:CanvasRenderingContext2D;
    

    constructor(ctx:CanvasRenderingContext2D){
        super();
        this.ctx = ctx;
    }


    draw = (item:Drawable, frame:Float, callback?:(item:Drawable, frame:Float)=>void) => {
        if(item instanceof Instance){
            this.ctx.save()
            this.ctx.transform(item.matrix2d.a, item.matrix2d.b, item.matrix2d.c, item.matrix2d.d, item.matrix2d.e, item.matrix2d.f)
            item.visit(frame, callback || this.draw)
            this.ctx.restore()
        }else if(item instanceof Sprite){
            this.ctx.drawImage(item.atlas.image, item.x, item.y, item.width, item.height, 0, 0, item.width, item.height)
        }else{
            item.visit(frame, callback || this.draw)
        }
    }

}