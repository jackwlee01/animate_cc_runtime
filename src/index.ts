import { LitElement, html,  PropertyValues, css } from 'lit';
import {property, customElement, query} from 'lit/decorators.js';
import { Library } from './Library';
import { Scene } from './Scene';
import { SceneCanvas2d } from './SceneCanvas2d';


@customElement('anim-cc')
export class AnimCC extends LitElement {

    @property({type: String})
    path:string = ''

    @property({type: Number})
    width:number = 300

    @property({type: Number})
    height:number = 150

    @property({type: String, attribute:"object-fit"})
    objectFit:'none'|'contain'|'cover'|'fill'|'scale-down' = 'none'

    @property({type: String, attribute:"background-color"})
    backgroundColor?:string

    @property({type: Number})
    speed:number = 1

    @property({type: Number, attribute:"frame"})
    frame?:number

    @property({type: Boolean})
    lerp:boolean = false

    
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
        }
        #anim-cc-canvas{
            transform-origin = top left;
            transform: scale(var(--scaleX), var(--scaleY));
        }
    `


    constructor(){
        super();
        this.onAnimationFrame();
    }


    attributeChangedCallback(name:keyof AnimCC, oldVal:any, newVal:any) {
        super.attributeChangedCallback(name, oldVal, newVal)

        switch(name){
            case 'path': this.reset(); break;
            case 'width': if(this.canvas) this.canvas.setAttribute('width', newVal+"px"); break;
            case 'height': if(this.canvas) this.canvas.setAttribute('height', newVal+"px"); break;
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

    set scaleX(value:number){ this.setVar('--scaleX', ""+digits(4, value)) } 
    set scaleY(value:number){ this.setVar('--scaleY', ""+digits(4, value)) } 
    setVar(name:string, value:string){
        if(this.style.getPropertyValue(name) != value){
            this.style.setProperty(name, value)
        }
    }
    
    /*
    private scale(x:number, y:number){
        //this.canvas!.style.transformOrigin = 'top left'
        //this.canvas!.style.transform = `scale(${x}, ${y})`
        this.style.setProperty('')
    }
    */


    private scaleToParent(){
        switch(this.objectFit){
            case 'none': break;
            case 'contain':
                const sx = this.container?.clientWidth! / this.width
                const sy = this.container?.clientHeight! / this.height
                const scale = sx<sy ? sx : sy
                this.scaleX = scale;
                this.scaleY = scale;
                break;
            case 'cover': break;
            case 'fill': break;
            case 'scale-down': break;
        }
    }

    private drawToContext(){
        if(!this.canvas || !this.ctx) return
        this.scaleToParent()

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        if(!this.scene || !this.library || !this.library.loaded) return

        if(this.backgroundColor){
            this.ctx.fillStyle = this.backgroundColor
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        }

        
        this.library.exported?.draw(this.frame!=undefined ? this.frame : this.currentFrame, this.lerp)
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
                <canvas id="anim-cc-canvas" width=${this.width} height=${this.height} background-color=${this.backgroundColor}></canvas>
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
