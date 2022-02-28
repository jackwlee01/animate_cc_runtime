var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { SceneCanvas2d } from './SceneCanvas2d';
let AnimCC = class AnimCC extends LitElement {
    constructor() {
        super();
        this.path = '';
        this.stageWidth = 300;
        this.stageHeight = 150;
        this.objectFit = 'contain';
        this.speed = 1;
        this.originX = 0;
        this.originY = 0;
        this.scale = 1;
        this.lerp = false;
        this.overflow = 'hidden';
        this.scene = null;
        this.library = null;
        this.currentFrame = 0;
        this.shouldRenderToContext = false;
        this.onAnimationFrame();
        this.setVar('--overflow', this.overflow);
    }
    attributeChangedCallback(name, oldVal, newVal) {
        super.attributeChangedCallback(name, oldVal, newVal);
        switch (name) {
            case 'path':
                this.reset();
                break;
            case 'resolution':
                if (this.canvas)
                    this.canvas.setAttribute('width', this.resultWidth + "px");
                if (this.canvas)
                    this.canvas.setAttribute('height', this.resultHeight + "px");
                break;
            case 'stageWidth':
                if (this.canvas)
                    this.canvas.setAttribute('width', this.resultWidth + "px");
                break;
            case 'stageHeight':
                if (this.canvas)
                    this.canvas.setAttribute('height', this.resultHeight + "px");
                break;
            case 'overflow': this.setVar('--overflow', newVal);
        }
    }
    get canvas() {
        var _a;
        return (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelector('#anim-cc-canvas');
    }
    get container() {
        var _a;
        return (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelector('#anim-cc-container');
    }
    get ctx() {
        if (this.canvas == null)
            throw ("Canvas not yet initialised");
        return this.canvas.getContext('2d');
    }
    reset() {
        this.scene = null;
        this.library = null;
    }
    initCanvas() {
        this.scene = new SceneCanvas2d(this.ctx);
        this.library = this.scene.createLibrary('anim-cc-library', this.path);
        this.library.loadData();
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        this.canvas.style.width = this.stageWidth + "px";
        this.canvas.style.height = this.stageHeight + "px";
    }
    connectedCallback() {
        super.connectedCallback();
        this.shouldRenderToContext = true;
        this.onAnimationFrame();
    }
    disconnectedCallback() {
        this.shouldRenderToContext = false;
        super.disconnectedCallback();
    }
    set canvasScaleX(value) { this.setVar('--scaleX', "" + digits(4, value)); }
    set canvasScaleY(value) { this.setVar('--scaleY', "" + digits(4, value)); }
    setVar(name, value) {
        if (this.style.getPropertyValue(name) != value) {
            this.style.setProperty(name, value);
        }
    }
    scaleToParent() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        switch (this.objectFit) {
            case 'none':
                this.canvasScaleX = 1;
                this.canvasScaleY = 1;
                break;
            case 'contain':
                var sx = ((_a = this.container) === null || _a === void 0 ? void 0 : _a.clientWidth) / this.stageWidth;
                var sy = ((_b = this.container) === null || _b === void 0 ? void 0 : _b.clientHeight) / this.stageHeight;
                var scale = sx < sy ? sx : sy;
                this.canvasScaleX = scale;
                this.canvasScaleY = scale;
                break;
            case 'cover':
                var sx = ((_c = this.container) === null || _c === void 0 ? void 0 : _c.clientWidth) / this.stageWidth;
                var sy = ((_d = this.container) === null || _d === void 0 ? void 0 : _d.clientHeight) / this.stageHeight;
                var scale = sx > sy ? sx : sy;
                this.canvasScaleX = scale;
                this.canvasScaleY = scale;
                break;
            case 'fill':
                this.canvasScaleX = ((_e = this.container) === null || _e === void 0 ? void 0 : _e.clientWidth) / this.stageWidth;
                this.canvasScaleY = ((_f = this.container) === null || _f === void 0 ? void 0 : _f.clientHeight) / this.stageHeight;
                break;
            case 'scale-down':
                var sx = ((_g = this.container) === null || _g === void 0 ? void 0 : _g.clientWidth) / this.stageWidth;
                var sy = ((_h = this.container) === null || _h === void 0 ? void 0 : _h.clientHeight) / this.stageHeight;
                var scale = sx < sy ? sx : sy;
                scale = scale < 1 ? scale : 1;
                this.canvasScaleX = scale;
                this.canvasScaleY = scale;
                break;
        }
    }
    get dpr() {
        return window.devicePixelRatio || 1;
    }
    get resultResolution() {
        return this.dpr * (this.resolution || 1);
    }
    get resultWidth() {
        return this.stageWidth * this.resultResolution;
    }
    get resultHeight() {
        return this.stageHeight * this.resultResolution;
    }
    drawToContext() {
        if (this.scene == null && this.canvas)
            this.initCanvas();
        if (!this.canvas || !this.ctx)
            return;
        //this.ctx.imageSmoothingEnabled = true;
        //this.ctx.imageSmoothingQuality = 'high'
        this.scaleToParent();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.scene || !this.library || !this.library.loaded)
            return;
        if (this.backgroundColor) {
            this.ctx.fillStyle = this.backgroundColor;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.ctx.save();
        this.ctx.scale(this.resultResolution, this.resultResolution);
        this.ctx.translate(this.stageWidth * this.originX, this.stageHeight * this.originY);
        this.ctx.scale(this.scale, this.scale);
        if (this.clip) {
            this.library.symbol(this.clip).draw(this.frame != undefined ? this.frame : this.currentFrame, this.lerp);
        }
        else {
            this.library.exported.draw(this.frame != undefined ? this.frame : this.currentFrame, this.lerp);
        }
        this.ctx.restore();
        this.currentFrame += this.speed;
    }
    onAnimationFrame() {
        if (this.shouldRenderToContext == false)
            return;
        this.drawToContext();
        requestAnimationFrame(this.onAnimationFrame.bind(this));
    }
    render() {
        return html `
            <div id="anim-cc-container">
                <canvas id="anim-cc-canvas" width=${this.resultWidth} height=${this.resultHeight} background-color=${this.backgroundColor}></canvas>
            </div>
        `;
    }
};
AnimCC.styles = css `
        #anim-cc-container{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: var(--overflow);
        }
        #anim-cc-canvas{
            transform-origin = top left;
            transform: scale(var(--scaleX), var(--scaleY));
        }
    `;
__decorate([
    property({ type: String })
], AnimCC.prototype, "path", void 0);
__decorate([
    property({ type: Number, attribute: "stage-width" })
], AnimCC.prototype, "stageWidth", void 0);
__decorate([
    property({ type: Number, attribute: "stage-height" })
], AnimCC.prototype, "stageHeight", void 0);
__decorate([
    property({ type: String, attribute: "object-fit" })
], AnimCC.prototype, "objectFit", void 0);
__decorate([
    property({ type: String, attribute: "background-color" })
], AnimCC.prototype, "backgroundColor", void 0);
__decorate([
    property({ type: Number })
], AnimCC.prototype, "speed", void 0);
__decorate([
    property({ type: Number, attribute: "frame" })
], AnimCC.prototype, "frame", void 0);
__decorate([
    property({ type: String })
], AnimCC.prototype, "clip", void 0);
__decorate([
    property({ type: Number, attribute: "origin-x" })
], AnimCC.prototype, "originX", void 0);
__decorate([
    property({ type: Number, attribute: "origin-y" })
], AnimCC.prototype, "originY", void 0);
__decorate([
    property({ type: Number, attribute: "scale" })
], AnimCC.prototype, "scale", void 0);
__decorate([
    property({ type: Boolean })
], AnimCC.prototype, "lerp", void 0);
__decorate([
    property({ type: String })
], AnimCC.prototype, "overflow", void 0);
__decorate([
    property({ type: Number })
], AnimCC.prototype, "resolution", void 0);
AnimCC = __decorate([
    customElement('anim-cc')
], AnimCC);
export { AnimCC };
// Utils
function digits(num, value) {
    value *= Math.pow(10, num);
    value = Math.round(value);
    value /= Math.pow(10, num);
    return value;
}
