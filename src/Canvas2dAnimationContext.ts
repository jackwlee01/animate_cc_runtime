import { AnimationContext } from "./core/AnimationContext"
import { ClipInstance } from "./core/ClipInstance";
import { Drawable } from "./core/Drawable"
import { Frame } from "./core/Frame";
import { Instance } from "./core/Instance"
import { FilterDropShadow, FilterType } from "./core/json/AnimationJson";
import { Layer } from "./core/Layer";
import { Sprite } from "./core/Sprite"
import { SpriteInstance } from "./core/SpriteInstance";
import { modWrap } from "./core/util/math";


// This is all of the library's rendering code required to draw into a canvas 2d context.
// This could easily be ported to any immediate mode rendering context, ie WebGL.
// This could also be ported to scene graph based libraries like PixiJS, or event the DOM,
// with a few modification to faciliate mapping to a scene graph.
export class Canvas2dAnimationContext extends AnimationContext{
    
    stack:CanvasRenderingContext2D[]
    pool:CanvasRenderingContext2D[];

    constructor(ctx:CanvasRenderingContext2D){
        super();
        this.stack = [ctx]
        this.pool = [];
    }


    get ctx(){
        return this.stack[this.stack.length-1]
    }


    pushContext(){
        const ctx = this.pool.length==0 ? document.createElement('canvas').getContext('2d')! : this.pool.pop()!
        ctx.canvas.width = this.ctx.canvas.width
        ctx.canvas.height = this.ctx.canvas.height
        ctx.setTransform(this.ctx.getTransform())
        this.stack.push(ctx)
    }


    popContext(){
        if(this.stack.length<=1) throw("Cannot pop stack")
        const ctx = this.stack.pop()!;
        this.ctx.save();
        this.ctx.resetTransform()
        this.ctx.drawImage(ctx!.canvas, 0, 0);
        this.ctx.restore();
        this.pool.push(ctx)
    }


    draw = (item:Drawable, frame:Float, callback?:(item:Drawable, frame:Float, lerp?:boolean)=>void, lerp?:boolean) => {
        if(item instanceof Layer){
           if(item.type=='Clipper'){
           }else if(item.clippedBy){
                const clipLayer = item.clip.layersByName[item.clippedBy]
                this.pushContext()
                clipLayer.draw(frame, callback, lerp)
                this.ctx.globalCompositeOperation = 'source-in'
                item.draw(frame, callback, lerp)
                this.popContext()
                //console.log("Draw masked")
                this.ctx.rect(0, 0, 10, 10)
            }else{
                item.draw(frame, callback, lerp)
            }
        }else if(item instanceof Instance){
            this.ctx.save()
            this.transformInstance(item, frame, lerp)
            this.handleFilters(item, frame, lerp)
            this.handleColor(item, frame, lerp)
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

    handleColor(item:Instance, frame:Float, lerp?:boolean){
        // TODO: Handle lerp on color
        if(item.color?.mode == 'CA' || item.color?.mode == 'Alpha' || item.color?.mode == 'Advanced' || item.color?.mode == 'AD') this.ctx.globalAlpha *= item.color.alphaMultiplier;
    }


    handleFilters(item:Instance, frame:Float, lerp?:boolean){
        // TODO: Handle lerp on filters
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