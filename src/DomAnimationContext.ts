import { Layer } from ".";
import { AnimationContext } from "./core/AnimationContext"
import { ClipInstance } from "./core/ClipInstance";
import { Drawable } from "./core/Drawable"
import { Frame } from "./core/Frame";
import { Instance } from "./core/Instance"
import { Sprite } from "./core/Sprite"
import { SpriteInstance } from "./core/SpriteInstance";
import { modWrap } from "./core/util";


export class DomAnimationContext extends AnimationContext{
    
    elemId:string
    elems:Array<HTMLElement>
    stack:Array<HTMLElement>


    constructor(elemId:string){
        super();
        this.elemId = elemId
        this.elems = []
        this.stack = [this.container]
    }


    get current(){
        return this.stack[this.stack.length-1] as HTMLDivElement
    }


    pushElem(type:string, name:string){
        const elem = document.createElement('div')
        elem.className = `anim anim-${type} anim-of-${name}`
        elem.style.position = 'absolute'
        elem.style.top = '0px'
        elem.style.left = '0px'
        elem.style.width = '0px'
        elem.style.height = '0px'
        this.current.appendChild(elem)
        this.elems.push(elem)
        this.stack.push(elem)
    }


    pop(){
        this.stack.pop()
    }


    get container(){
        return document.getElementById(this.elemId) as HTMLDivElement
    }



    clear(){
        while(this.elems.length > 0){
            const elem = this.elems.shift();
            elem!.remove();
        }
    }


    draw = (item:Drawable, frame:Float, callback?:(item:Drawable, frame:Float, lerp?:boolean)=>void, lerp?:boolean) => {
        if(!this.container) return;
        if(item instanceof Layer){
            this.pushElem('layer', item.name)
            if(callback) callback(item, frame, lerp)
            else item.draw(frame, callback, lerp)
            this.pop()
        }else if(item instanceof Frame){
            this.pushElem('frame', item.name)
            if(callback) callback(item, frame, lerp)
            else item.draw(frame, callback, lerp)
            this.pop()
        }else if(item instanceof SpriteInstance){
            this.pushElem('sprite', item.name)
            this.transformInstance(item, frame, lerp)
            if(callback) callback(item, frame, lerp)
            else item.draw(frame, callback, lerp)
            this.pop()
        }else if(item instanceof ClipInstance){
            this.pushElem('clip', item.name)
            this.transformInstance(item, frame, lerp)
            if(callback) callback(item, frame, lerp)
            else item.draw(frame, callback, lerp)
            this.pop()
        }else if(item instanceof Sprite){
            this.current.style.width = item.width + 'px'
            this.current.style.height = item.height + 'px'
            this.current.style.backgroundImage = `url(${item.atlas.image.src})`
            this.current.style.backgroundPosition = `${-item.x}px ${-item.y}px`
            //this.current.style.border = '1px solid red'
        }else{
            if(callback) callback(item, frame, lerp)
            else item.draw(frame, callback, lerp)
        }
    }


    pushTranslate(x:string, y:string){
        this.pushElem('transform', 'translate')
        this.current.style.transform = `translate(${x}, ${y})`
    }


    pushScale(x:string, y:string){
        this.pushElem('transform', 'scale')
        this.current.style.transform = `scale(${x}, ${y})`
    }

    pushRotation(z:string){
        this.pushElem('transform', 'scale')
        this.current.style.transform = `rotate(${z})`
    }
    

    transformInstance(item:Instance, frame:Float, lerp?:boolean){
        const m = item.matrix2d
        this.current.style.transform = `matrix(${m.a}, ${m.b}, ${m.c}, ${m.d}, ${m.e}, ${m.f})`
        /*
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
        */
    }

}