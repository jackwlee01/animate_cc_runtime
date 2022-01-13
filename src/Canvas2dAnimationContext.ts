import { AnimationContext } from "./core/AnimationContext"
import { ClipInstance } from "./core/ClipInstance";
import { Drawable } from "./core/Drawable"
import { Frame } from "./core/Frame";
import { Instance } from "./core/Instance"
import { Sprite } from "./core/Sprite"
import { SpriteInstance } from "./core/SpriteInstance";


// This is all of the library's rendering code required to draw into a canvas 2d context.
// This could easily be ported to any immediate mode rendering context, ie WebGL.
// This could also be ported to scene graph based libraries like PixiJS, or event the DOM,
// with a few modification to faciliate mapping to a scene graph.
export class Canvas2dAnimationContext extends AnimationContext{
    
    ctx:CanvasRenderingContext2D;
    

    constructor(ctx:CanvasRenderingContext2D){
        super();
        this.ctx = ctx;
    }


    draw = (item:Drawable, frame:Float, callback?:(item:Drawable, frame:Float)=>void, lerp?:boolean) => {
        if(item instanceof SpriteInstance){
            this.ctx.save()
            // TODO: Add lerp support here
            this.ctx.transform(item.matrix2d.a, item.matrix2d.b, item.matrix2d.c, item.matrix2d.d, item.matrix2d.e, item.matrix2d.f)
            if(callback) callback(item, frame)
            else item.draw(frame, callback)
            this.ctx.restore()
        }else if(item instanceof ClipInstance){
            this.ctx.save()
            this.ctx.transform(item.matrix2d.a, item.matrix2d.b, item.matrix2d.c, item.matrix2d.d, item.matrix2d.e, item.matrix2d.f)
            if(callback) callback(item, frame)
            else item.draw(frame, callback)
            this.ctx.restore()
        }else if(item instanceof Sprite){
            if(callback) callback(item, frame)
            this.ctx.drawImage(item.atlas.image, item.x, item.y, item.width, item.height, 0, 0, item.width, item.height)
        }else{
            if(callback) callback(item, frame)
            else item.draw(frame, callback)
        }
    }

}