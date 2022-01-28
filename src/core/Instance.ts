import { Drawable } from "./Drawable";
import { Frame } from "./Frame";
import { Matrix2d } from "./geom/Matrix2d";
import { Vec3 } from "./geom/Vec3";
import { DrawableProps } from './Drawable'
import { Matrix3d } from "./geom/Matrix3d";
import { Color, Filters } from "./json/AnimationJson";


export type InstanceProps = Omit<DrawableProps, 'id' | 'library'> & {
    itemName:string,
    // TODO: Use DOMMatrix instead of custom matrix
    matrix2d:Matrix2d,
    matrix3d:Matrix3d,
    frame:Frame,
    filters:Filters|null,
    color:Color|null,
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
    filters:Filters|null;
    color:Color|null;
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
        this.filters = props.filters;
        this.color = props.color;
        //this.position = props.position;
        //this.scale = props.scale;
        //this.rotation = props.rotation;
        this.frame = props.frame;
        this.index = this.frame.instances.length;
    }


    public get prev():Instance|undefined{
        const item = this.frame.prev?.instances[this.index]
        return item?.itemName==this.itemName ? item : undefined 
    }


    public get next():Instance|undefined{
        const item = this.frame.next?.instances[this.index]
        return item?.itemName==this.itemName ? item : undefined
    }


    public get item():Drawable{
        throw("Override item getter in base class");
    }


    public draw(frame:Float, lerp?:boolean, callback?:(item:Drawable, frame:Float, lerp?:boolean)=>void):void{
        this.library.scene.draw(this.item, frame, lerp, callback)
    }


}