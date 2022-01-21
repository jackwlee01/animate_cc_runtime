import { Drawable } from "./Drawable";
import { Frame } from "./Frame";
import { Matrix2d } from "./geom/Matrix2d";
import { Vec3 } from "./geom/Vec3";
import { DrawableProps } from './Drawable'
import { Matrix3d } from "./geom/Matrix3d";


export type InstanceProps = Omit<DrawableProps, 'id' | 'library'> & {
    itemName:string,
    matrix2d:Matrix2d,
    matrix3d:Matrix3d,
    frame:Frame,
    //position:Vec3,
    //scale:Vec3,
    //rotation:Vec3,
}


export class Instance extends Drawable{

    matrix2d:Matrix2d;
    matrix3d:Matrix3d;
    frame:Frame;
    index:number;
    itemName:string;
    //position:Vec3;
    //scale:Vec3;
    //rotation:Vec3;
    //filters = new Array<Filter>();

    
    constructor(props:InstanceProps){
        super({
            ...props,
            library: props.frame.library,
            id: `${props.frame.id}.${props.frame.instances.length}`,
        });

        this.itemName = props.itemName;
        this.matrix2d = props.matrix2d;
        this.matrix3d = props.matrix3d;
        //this.position = props.position;
        //this.scale = props.scale;
        //this.rotation = props.rotation;
        this.frame = props.frame;
        this.index = this.frame.instances.length;
    }


    public get prev():Instance|undefined{
        return this.frame.prev?.instances[this.index]
    }


    public get next():Instance|undefined{
        return this.frame.next?.instances[this.index]
    }


    public get item():Drawable{
        throw("Override item getter in base class");
    }


    public draw(frame:Float, callback?:(item:Drawable, frame:Float, lerp?:boolean)=>void, lerp?:boolean):void{
        this.library.context.draw(this.item, frame, callback, lerp)
    }


    public visit(frame:Float, callback:(item:Drawable, frame:Float)=>void):void{
        callback(this, frame)
    }

}