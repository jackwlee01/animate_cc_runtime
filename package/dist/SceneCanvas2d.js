"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneCanvas2d = void 0;
const Scene_1 = require("./Scene");
const Instance_1 = require("./Instance");
const Layer_1 = require("./Layer");
const Sprite_1 = require("./Sprite");
const math_1 = require("./util/math");
// This is all of the library's rendering code required to draw into a canvas 2d context.
// This could easily be ported to any immediate mode rendering context, ie WebGL.
// This could also be ported to scene graph based libraries like PixiJS, or event the DOM,
// with a few modification to faciliate mapping to a scene graph.
class SceneCanvas2d extends Scene_1.Scene {
    constructor(ctx) {
        super();
        this.draw = (item, frame, lerp, callback) => {
            if (item instanceof Layer_1.Layer) {
                if (item.type == 'Clipper') {
                }
                else if (item.clippedBy) {
                    const clipLayer = item.clip.layersByName[item.clippedBy];
                    this.pushRenderTarget();
                    clipLayer.draw(frame, lerp, callback);
                    this.ctx.globalCompositeOperation = 'source-in';
                    if (callback)
                        callback(item, frame, lerp);
                    else
                        item.draw(frame, lerp, callback);
                    this.popRenderTarget();
                }
                else {
                    if (callback)
                        callback(item, frame, lerp);
                    else
                        item.draw(frame, lerp, callback);
                }
            }
            else if (item instanceof Instance_1.Instance) {
                this.ctx.save();
                this.transformInstance(item, frame, lerp);
                const didPushContext = this.handleFilters(item, frame, lerp);
                this.handleColor(item, frame, lerp);
                if (callback)
                    callback(item, frame, lerp);
                else
                    item.draw(frame, lerp, callback);
                if (didPushContext)
                    this.popRenderTarget();
                this.ctx.restore();
            }
            else if (item instanceof Sprite_1.Sprite) {
                if (callback)
                    callback(item, frame, lerp);
                else
                    item.draw(frame, lerp, callback);
            }
            else {
                if (callback)
                    callback(item, frame, lerp);
                else
                    item.draw(frame, lerp, callback);
            }
        };
        this.drawImage = (image, sx, sy, sw, sh, rx, ry, rw, rh) => {
            this.ctx.drawImage(image, sx, sy, sw, sh, rx, ry, rw, rh);
        };
        this.canvas = ctx.canvas;
        this.stack = [ctx];
        this.pool = [];
        this._mouseX = -1;
        this._mouseY = -1;
        ctx.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
    onMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        this._mouseX = (e.clientX - rect.left) * scaleX;
        this._mouseY = (e.clientY - rect.top) * scaleY;
    }
    get mouseX() {
        return this._mouseX;
    }
    get mouseY() {
        return this._mouseY;
    }
    getLocal(x, y) {
        const point = new DOMPoint(x, y);
        const matrix = this.ctx.getTransform();
        const imatrix = matrix.inverse();
        return point.matrixTransform(imatrix);
    }
    get ctx() {
        return this.stack[this.stack.length - 1];
    }
    pushRenderTarget() {
        const ctx = this.pool.length == 0 ? document.createElement('canvas').getContext('2d') : this.pool.pop();
        ctx.canvas.width = this.ctx.canvas.width;
        ctx.canvas.height = this.ctx.canvas.height;
        ctx.setTransform(this.ctx.getTransform());
        this.stack.push(ctx);
    }
    popRenderTarget() {
        if (this.stack.length <= 1)
            throw ("Cannot pop stack");
        const ctx = this.stack.pop();
        this.ctx.save();
        this.ctx.resetTransform();
        this.ctx.drawImage(ctx.canvas, 0, 0);
        this.ctx.restore();
        this.pool.pop();
    }
    handleColor(item, frame, lerp) {
        var _a, _b, _c, _d;
        // TODO: Handle lerp on color
        if (((_a = item.color) === null || _a === void 0 ? void 0 : _a.mode) == 'CA' || ((_b = item.color) === null || _b === void 0 ? void 0 : _b.mode) == 'Alpha' || ((_c = item.color) === null || _c === void 0 ? void 0 : _c.mode) == 'Advanced' || ((_d = item.color) === null || _d === void 0 ? void 0 : _d.mode) == 'AD')
            this.ctx.globalAlpha *= item.color.alphaMultiplier;
    }
    handleFilters(item, frame, lerp) {
        // TODO: Handle lerp on filters
        if (item.filters) {
            for (let k of Object.keys(item.filters)) {
                const key = k;
                if (key == 'DropShadowFilter') {
                    const filter = item.filters[key];
                    this.pushDropShadow(filter.color + (Math.round(filter.strength * 255)).toString(16), filter.blurX, Math.cos(filter.angle * Math.PI / 180) * filter.distance, Math.sin(filter.angle * Math.PI / 180) * filter.distance);
                    return true;
                }
            }
        }
    }
    pushDropShadow(color, blur, offsetX = 0, offsetY = 0) {
        this.ctx.save();
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = blur;
        this.ctx.shadowOffsetX = offsetX;
        this.ctx.shadowOffsetY = offsetY;
        this.pushRenderTarget();
    }
    popDropShadow() {
        this.popRenderTarget();
        this.ctx.restore();
    }
    transformInstance(item, frame, lerp) {
        if (lerp && item.next) {
            const t = ((0, math_1.modWrap)(frame, item.totalFrames) - item.index) / item.frame.totalFrames;
            const m1 = item.matrix;
            const m2 = item.next.matrix;
            this.ctx.transform(m1._00 + (m2._00 - m1._00) * t, m1._01 + (m2._01 - m1._01) * t, m1._10 + (m2._10 - m1._10) * t, m1._11 + (m2._11 - m1._11) * t, m1._30 + (m2._30 - m1._30) * t, m1._31 + (m2._31 - m1._31) * t);
        }
        else {
            this.ctx.transform(item.matrix._00, item.matrix._01, item.matrix._10, item.matrix._11, item.matrix._30, item.matrix._31);
        }
    }
}
exports.SceneCanvas2d = SceneCanvas2d;
