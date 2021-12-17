import { Drawable } from "./Drawable";
import { Frame } from "./Frame";
import { Matrix, Vec2, Vec3 } from "./geom";
import { Library } from "./Library";

export class Instance<T extends Drawable> extends Drawable{

    matrix:Matrix;
    position:Vec3;
    scale:Vec3;
    rotation:Vec3;
    transformationPoint:Vec2;
    frame:Frame;
    //filters = new Array<Filter>();
    firstInstance:Instance<any>;
    index:number;
    item:T;

    constructor(props:{
        name:string,
        id:string,
        totalFrames:number,
        library:Library,
        
        item:T,
        matrix:Matrix,
        position:Vec3,
        scale:Vec3,
        rotation:Vec3,
        transformationPoint:Vec2,
        frame:Frame,
        firstInstance:Instance<any>|null,
    }){
        super(props);
        this.item = props.item;
        this.matrix = props.matrix;
        this.position = props.position;
        this.scale = props.scale;
        this.rotation = props.rotation;
        this.transformationPoint = props.transformationPoint;
        this.firstInstance = props.firstInstance || this;

        this.frame = props.frame;
        this.index = this.frame.instances.length;
    }

}