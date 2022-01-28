import { Scene } from "./core/Scene"
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
export class Canvas2dScene extends Scene{
    
    canvas:HTMLCanvasElement
    stack:CanvasRenderingContext2D[]
    pool:CanvasRenderingContext2D[]

    //imageData:Record<string, 

    private _mouseX:number;
    private _mouseY:number;


    constructor(ctx:CanvasRenderingContext2D){
        super();
        this.canvas = ctx.canvas
        this.stack = [ctx]
        this.pool = [];

        this._mouseX = -1;
        this._mouseY = -1;
        ctx.canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
    }


    onMouseMove(e:MouseEvent){
        const rect = this.canvas.getBoundingClientRect()
        const scaleX = this.canvas.width / rect.width
        const scaleY = this.canvas.height / rect.height
        this._mouseX = (e.clientX - rect.left) * scaleX
        this._mouseY = (e.clientY - rect.top) * scaleY
    }


    get mouseX(){
        return this._mouseX
    }


    get mouseY(){
        return this._mouseY
    }


    getLocal(x:number, y:number){
        const point = new DOMPoint(x, y)
        const matrix = this.ctx.getTransform()
        const imatrix = matrix.inverse()
        return point.matrixTransform(imatrix)
    }


    get ctx(){
        return this.stack[this.stack.length-1]
    }


    pushRenderTarget(){
        const ctx = this.pool.length==0 ? document.createElement('canvas').getContext('2d')! : this.pool.pop()!
        ctx.canvas.width = this.ctx.canvas.width
        ctx.canvas.height = this.ctx.canvas.height
        ctx.setTransform(this.ctx.getTransform())
        this.stack.push(ctx)
    }


    popRenderTarget(){
        if(this.stack.length<=1) throw("Cannot pop stack")
        const ctx = this.stack.pop()!;
        this.ctx.save();
        this.ctx.resetTransform()
        this.ctx.drawImage(ctx!.canvas, 0, 0);
        this.ctx.restore();
        this.pool.push(ctx)
    }


    draw = (item:Drawable, frame:Float, lerp?:boolean, callback?:(item:Drawable, frame:Float, lerp?:boolean)=>void) => {
        if(item instanceof Layer){
           if(item.type=='Clipper'){
           }else if(item.clippedBy){
                const clipLayer = item.clip.layersByName[item.clippedBy]
                this.pushRenderTarget()
                clipLayer.draw(frame, lerp, callback)
                this.ctx.globalCompositeOperation = 'source-in'
                if(callback) callback(item, frame, lerp)
                else item.draw(frame, lerp, callback)
                this.popRenderTarget()
            }else{
                if(callback) callback(item, frame, lerp)
                else item.draw(frame, lerp, callback)
            }
        }else if(item instanceof Instance){
            this.ctx.save()
            this.transformInstance(item, frame, lerp)
            const didPushContext = this.handleFilters(item, frame, lerp)
            this.handleColor(item, frame, lerp)
            if(callback) callback(item, frame, lerp)
            else item.draw(frame, lerp, callback)
            if(didPushContext) this.popRenderTarget()
            this.ctx.restore()
        }else if(item instanceof Sprite){
            if(callback) callback(item, frame, lerp)
            else item.draw(frame, lerp, callback)
        }else{
            if(callback) callback(item, frame, lerp)
            else item.draw(frame, lerp, callback)
        }
    }



    drawImage = (image:HTMLImageElement, sx:number, sy:number, sw:number, sh:number, rx:number, ry:number, rw:number, rh:number) => {
        this.ctx.drawImage(image, sx, sy, sw, sh, rx, ry, rw, rh)
    }

    
    private handleColor(item:Instance, frame:Float, lerp?:boolean){
        // TODO: Handle lerp on color
        if(item.color?.mode == 'CA' || item.color?.mode == 'Alpha' || item.color?.mode == 'Advanced' || item.color?.mode == 'AD') this.ctx.globalAlpha *= item.color.alphaMultiplier;
    }


    private handleFilters(item:Instance, frame:Float, lerp?:boolean){
        // TODO: Handle lerp on filters
        if(item.filters){
            for(let k of Object.keys(item.filters)){
                const key = k as FilterType;
                if(key=='DropShadowFilter'){
                    const filter = item.filters[key] as FilterDropShadow;
                    this.pushDropShadow(
                        filter.color + (Math.round(filter.strength*255)).toString(16),
                        filter.blurX,
                        Math.cos(filter.angle*Math.PI/180) * filter.distance,
                        Math.sin(filter.angle*Math.PI/180) * filter.distance,
                    )
                    return true;
                }
            }
        }
    }


    pushDropShadow(color:string, blur:number, offsetX:Float=0, offsetY:Float=0){
        this.ctx.save();
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = blur;
        this.ctx.shadowOffsetX = offsetX;
        this.ctx.shadowOffsetY = offsetY;
        this.pushRenderTarget();
    }


    popDropShadow(){
        this.popRenderTarget();
        this.ctx.restore()
    }


    private transformInstance(item:Instance, frame:Float, lerp?:boolean){
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