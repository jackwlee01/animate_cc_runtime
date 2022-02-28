import { Layer } from "./Layer";
import { Scene } from "./Scene";
import { ClipInstance } from "./ClipInstance";
import { Frame } from "./Frame";
import { Sprite } from "./Sprite";
import { SpriteInstance } from "./SpriteInstance";
export class SceneDom extends Scene {
    constructor(elemId) {
        super();
        this.draw = (item, frame, lerp, callback) => {
            if (!this.container)
                return;
            if (item instanceof Layer) {
                this.pushElem('layer', item.name, item.id);
                if (callback)
                    callback(item, frame, lerp);
                else
                    item.draw(frame, lerp, callback);
                this.pop();
            }
            else if (item instanceof Frame) {
                this.pushElem('frame', item.name, item.id);
                if (callback)
                    callback(item, frame, lerp);
                else
                    item.draw(frame, lerp, callback);
                this.pop();
            }
            else if (item instanceof SpriteInstance) {
                this.pushElem('sprite', item.name, item.id);
                this.transformInstance(item, frame, lerp);
                if (callback)
                    callback(item, frame, lerp);
                else
                    item.draw(frame, lerp, callback);
                this.pop();
            }
            else if (item instanceof ClipInstance) {
                this.pushElem('clip', item.name, item.id);
                this.transformInstance(item, frame, lerp);
                if (callback)
                    callback(item, frame, lerp);
                else
                    item.draw(frame, lerp, callback);
                this.pop();
            }
            else if (item instanceof Sprite) {
                this.current.style.width = item.width + 'px';
                this.current.style.height = item.height + 'px';
                this.current.style.backgroundImage = `url(${item.atlas.image.src})`;
                this.current.style.backgroundPosition = `${-item.x}px ${-item.y}px`;
                //this.current.style.border = '1px solid red'
            }
            else {
                if (callback)
                    callback(item, frame, lerp);
                else
                    item.draw(frame, lerp, callback);
            }
        };
        this.elemId = elemId;
        this.elems = [];
        this.stack = [this.container];
    }
    get current() {
        return this.stack[this.stack.length - 1];
    }
    pushElem(type, name, id) {
        const elem = document.createElement('div');
        elem.className = `anim anim-${type} anim-of-${name}`;
        elem.style.position = 'absolute';
        elem.style.top = '0px';
        elem.style.left = '0px';
        elem.style.width = '0px';
        elem.style.height = '0px';
        this.current.appendChild(elem);
        this.elems.push(elem);
        this.stack.push(elem);
    }
    pop() {
        this.stack.pop();
    }
    get container() {
        return document.getElementById(this.elemId);
    }
    clear() {
        while (this.elems.length > 0) {
            const elem = this.elems.shift();
            elem.remove();
        }
    }
    pushTranslate(x, y) {
        this.pushElem('transform', 'translate', '__transform__');
        this.current.style.transform = `translate(${x}, ${y})`;
    }
    pushScale(x, y) {
        this.pushElem('transform', 'scale', '__scale__');
        this.current.style.transform = `scale(${x}, ${y})`;
    }
    pushRotation(z) {
        this.pushElem('transform', 'rotation', '__rotation__');
        this.current.style.transform = `rotate(${z})`;
    }
    transformInstance(item, frame, lerp) {
        /*
        const m = item.matrix2d
        if(lerp && item.next){
            const t = (modWrap(frame, item.totalFrames)-item.index) / item.frame.totalFrames;
            const m1 = item.matrix2d
            const m2 = item.next.matrix2d
            this.current.style.transform = `matrix(${m1.a + (m2.a-m1.a)*t}, ${m1.b + (m2.b-m1.b)*t}, ${m1.c + (m2.c-m1.c)*t}, ${m1.d + (m2.d-m1.d)*t}, ${m1.e + (m2.e-m1.e)*t}, ${m1.f + (m2.f-m1.f)*t})`
        }else{
            this.current.style.transform = `matrix(${m.a}, ${m.b}, ${m.c}, ${m.d}, ${m.e}, ${m.f})`
       }
        */
        const m = item.matrix;
        this.current.style.transform = `matrix3d(${m._00}, ${m._01}, ${m._02}, ${m._03}, ${m._10}, ${m._11}, ${m._12}, ${m._13}, ${m._20}, ${m._21}, ${m._22}, ${m._23}, ${m._30}, ${m._31}, ${m._32}, ${m._33})`;
    }
}
