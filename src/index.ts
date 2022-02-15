import { LitElement, html, property, customElement, query, PropertyValues } from 'lit-element';
import { Library } from './Library';
import { Scene } from './Scene';
import { SceneCanvas2d } from './SceneCanvas2d';


@customElement('anim-cc')
export class AnimCC extends LitElement {

    @property({type: String})
    path:string = ''

    @property({type: String})
    width:string = ''

    @property({type: String})
    height:string = ''

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
    

    constructor(){
        super();
        this.onAnimationFrame();
    }


    attributeChangedCallback(name:keyof AnimCC, oldVal:any, newVal:any) {
        super.attributeChangedCallback(name, oldVal, newVal)

        switch(name){
            case 'path': this.reset(); break;
            case 'width': if(this.canvas) this.canvas.setAttribute('width', newVal); break;
            case 'height': if(this.canvas) this.canvas.setAttribute('height', newVal); break;
        }
    }


    protected updated(_changedProperties: PropertyValues<any>): void {
        super.updated(_changedProperties)
        if(this.scene==null) this.initCanvas()
    }

    get canvas(){
        return this.renderRoot?.querySelector('#anim-cc-canvas') as HTMLCanvasElement|null
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


    private drawToContext(){
        if(!this.canvas || !this.ctx) return
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
            <canvas id="anim-cc-canvas" width=${this.width} height=${this.height} background-color=${this.backgroundColor}></canvas>
        `;
    }
}
