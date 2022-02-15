import { LitElement, html,  PropertyValues, css } from 'lit';
import {property, customElement, query} from 'lit/decorators.js';
import { Library } from './Library';
import { Scene } from './Scene';
import { SceneCanvas2d } from './SceneCanvas2d';


@customElement('anim-cc')
export class AnimCC extends LitElement {

    @property({type: String})
    path:string = ''

    @property({type: Number, attribute:"stage-width"})
    stageWidth:number = 300

    @property({type: Number, attribute:"stage-height"})
    stageHeight:number = 150

    @property({type: String, attribute:"object-fit"})
    objectFit:'none'|'contain'|'cover'|'fill'|'scale-down' = 'none'

    @property({type: String, attribute:"background-color"})
    backgroundColor?:string

    @property({type: Number})
    speed:number = 1

    @property({type: Number, attribute:"frame"})
    frame?:number

    @property({type: String})
    clip?:string

    @property({type: Number, attribute:"origin-x"})
    originX:number = 0

    @property({type: Number, attribute:"origin-y"})
    originY:number = 0

    @property({type: Number, attribute:"scale"})
    scale:number = 1

    @property({type: Boolean})
    lerp:boolean = false

    @property({type: String})
    overflow:string = 'hidden'

    @property({type: Number})
    resolution?:number;

    @property({type: Number, attribute:"device-pixel-ratio"})
    devicePixelRatio?:number;

    
    scene:Scene|null = null
    library:Library|null = null
    currentFrame = 0;

    private shouldRenderToContext = false


    static styles = css`
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
    `


    constructor(){
        super();
        this.onAnimationFrame();

        this.setVar('--overflow', this.overflow)
    }


    attributeChangedCallback(name:keyof AnimCC, oldVal:any, newVal:any) {
        super.attributeChangedCallback(name, oldVal, newVal)

        switch(name){
            case 'path': this.reset(); break;
            case 'stageWidth': if(this.canvas) this.canvas.setAttribute('width', newVal+"px"); break;
            case 'stageHeight': if(this.canvas) this.canvas.setAttribute('height', newVal+"px"); break;
            case 'overflow': this.setVar('--overflow', newVal)
        }
    }


    protected updated(_changedProperties: PropertyValues<any>): void {
        super.updated(_changedProperties)
        if(this.scene==null) this.initCanvas()
    }


    get canvas(){
        return this.renderRoot?.querySelector('#anim-cc-canvas') as HTMLCanvasElement|null
    }


    get container(){
        return this.renderRoot?.querySelector('#anim-cc-container') as HTMLCanvasElement|null
    }


    get ctx(){
        if(this.canvas==null) throw("Canvas not yet initialised")
        return this.canvas.getContext('2d')!
    }


    private reset(){
        this.scene = null;
        this.library = null;
    }


    private initCanvas(){
        this.scene = new SceneCanvas2d(this.ctx)
        this.library = this.scene.createLibrary('anim-cc-library', this.path)
        this.library.loadData()
        this.ctx.imageSmoothingEnabled = true
        this.ctx.imageSmoothingQuality = 'high'
        this.canvas!.style.width = this.stageWidth + "px"
        this.canvas!.style.height = this.stageHeight + "px"
    }


    connectedCallback(): void {
        super.connectedCallback()
        this.shouldRenderToContext = true
        this.onAnimationFrame()
    }


    disconnectedCallback(): void {
        this.shouldRenderToContext = false
        super.disconnectedCallback()
    }

    set canvasScaleX(value:number){ this.setVar('--scaleX', ""+digits(4, value)) } 
    set canvasScaleY(value:number){ this.setVar('--scaleY', ""+digits(4, value)) } 
    setVar(name:string, value:string){
        if(this.style.getPropertyValue(name) != value){
            this.style.setProperty(name, value)
        }
    }

    

    private scaleToParent(){
        switch(this.objectFit){
            case 'none':
                this.canvasScaleX = 1;
                this.canvasScaleY = 1;
                break;
            case 'contain':
                var sx = this.container?.clientWidth! / this.stageWidth
                var sy = this.container?.clientHeight! / this.stageHeight
                var scale = sx<sy ? sx : sy
                this.canvasScaleX = scale;
                this.canvasScaleY = scale;
                break;
            case 'cover':
                var sx = this.container?.clientWidth! / this.stageWidth
                var sy = this.container?.clientHeight! / this.stageHeight
                var scale = sx>sy ? sx : sy
                this.canvasScaleX = scale;
                this.canvasScaleY = scale;
                break;
            case 'fill':
                this.canvasScaleX = this.container?.clientWidth! / this.stageWidth
                this.canvasScaleY = this.container?.clientHeight! / this.stageHeight
                break;
            case 'scale-down':
                var sx = this.container?.clientWidth! / this.stageWidth
                var sy = this.container?.clientHeight! / this.stageHeight
                var scale = sx<sy ? sx : sy
                scale = scale < 1 ? scale : 1
                this.canvasScaleX = scale
                this.canvasScaleY = scale
            break;
        }
    }


    get dpr(){
        return window.devicePixelRatio || 1
    }


    private get resultResolution(){
        return (this.devicePixelRatio||this.dpr) * (this.resolution||1)
    }


    private drawToContext(){
        if(!this.canvas || !this.ctx) return
        //this.ctx.imageSmoothingEnabled = true;
        //this.ctx.imageSmoothingQuality = 'high'
        
        this.scaleToParent()

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        if(!this.scene || !this.library || !this.library.loaded) return

        if(this.backgroundColor){
            this.ctx.fillStyle = this.backgroundColor
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        }

        this.ctx.save()
            this.ctx.scale(this.resultResolution, this.resultResolution)
            this.ctx.translate(this.stageWidth*this.originX, this.stageHeight*this.originY)
            this.ctx.scale(this.scale, this.scale)
            if(this.clip){
                this.library.symbol(this.clip).draw(this.frame!=undefined ? this.frame : this.currentFrame, this.lerp)
            }else{
                this.library.exported.draw(this.frame!=undefined ? this.frame : this.currentFrame, this.lerp)
            }
        this.ctx.restore()

        this.currentFrame += this.speed;
    }


    private onAnimationFrame(){
        if(this.shouldRenderToContext==false) return
        this.drawToContext()
        requestAnimationFrame(this.onAnimationFrame.bind(this))    
    }


    render() {
        return html`
            <div id="anim-cc-container">
                <canvas id="anim-cc-canvas" width=${this.stageWidth*this.resultResolution} height=${this.stageHeight*this.resultResolution} background-color=${this.backgroundColor}></canvas>
            </div>
        `;
    }
}


// Utils
function digits(num:number, value:number){
    value *= Math.pow(10, num)
    value = Math.round(value)
    value /= Math.pow(10, num)
    return value;
}


/*
export function getDPR(canvas:HTMLCanvasElement, width:number=-1, height:number=-1) {
    // Set the context quality and smoothing
    const ctx = canvas.getContext('2d')!
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high'

    // Set the canvas according to window width
    var bodyRec = document.body.getBoundingClientRect();
    canvas.width = width==-1 ? Math.min(1000, bodyRec.width - 8) : width;
    canvas.height = height==-1 ? canvas.width : height;

    // Get the device pixel ratio, falling back to 1.
    let dpr = window.devicePixelRatio || 1;

    // Get the size of the canvas in CSS pixels.
    let rect = canvas.getBoundingClientRect();
    
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    //canvas.style.border = "2px solid gray";
    canvas.style.width = "" + canvas.width + "px";
    canvas.style.height = "" + canvas.height + "px";
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    return dpr;
}
*/