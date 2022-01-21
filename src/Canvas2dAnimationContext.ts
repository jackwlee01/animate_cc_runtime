import { Layer } from ".";
import { AnimationContext } from "./core/AnimationContext"
import { ClipInstance } from "./core/ClipInstance";
import { Drawable } from "./core/Drawable"
import { Frame } from "./core/Frame";
import { Instance } from "./core/Instance"
import { FilterDropShadow, FilterType } from "./core/json/AnimationJson";
import { Sprite } from "./core/Sprite"
import { SpriteInstance } from "./core/SpriteInstance";
import { modWrap } from "./core/util/math";


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


    draw = (item:Drawable, frame:Float, callback?:(item:Drawable, frame:Float, lerp?:boolean)=>void, lerp?:boolean) => {
        if(item instanceof Instance){
            this.ctx.save()
            this.transformInstance(item, frame, lerp)
            this.handleFilters(item, frame, lerp)
            if(callback) callback(item, frame, lerp)
            else item.draw(frame, callback, lerp)
            this.ctx.restore()
        }else if(item instanceof Sprite){
            if(callback) callback(item, frame, lerp)
            this.ctx.drawImage(item.atlas.image, item.x, item.y, item.width, item.height, 0, 0, item.width, item.height)
        }else{
            if(callback) callback(item, frame, lerp)
            else item.draw(frame, callback, lerp)
        }
    }


    handleFilters(item:Instance, frame:Float, lerp?:boolean){
        if(item.filters){
            for(let k of Object.keys(item.filters)){
                const key = k as FilterType;
                if(key=='DropShadowFilter'){
                    const filter = item.filters[key] as FilterDropShadow;
                    this.ctx.shadowBlur = filter.blurX;
                    this.ctx.shadowColor = filter.color + (Math.round(filter.strength*255)).toString(16);
                    this.ctx.shadowOffsetX = Math.cos(filter.angle*Math.PI/180) * filter.distance
                    this.ctx.shadowOffsetY = Math.sin(filter.angle*Math.PI/180) * filter.distance
                }
            }
        }
    }


    transformInstance(item:Instance, frame:Float, lerp?:boolean){
        if(lerp && item.next){
            const t = (modWrap(frame, item.totalFrames)-item.index) / item.frame.totalFrames;
            const m1 = item.matrix2d
            const m2 = item.next.matrix2d 
            this.ctx.transform(
                m1.a + (m2.a-m1.a)*t,
                m1.b + (m2.b-m1.b)*t,
                m1.c + (m2.c-m1.c)*t,
                m1.d + (m2.d-m1.d)*t,
                m1.e + (m2.e-m1.e)*t,
                m1.f + (m2.f-m1.f)*t,
            )
        }else{
            this.ctx.transform(item.matrix2d.a, item.matrix2d.b, item.matrix2d.c, item.matrix2d.d, item.matrix2d.e, item.matrix2d.f)
        }
    }
    
}