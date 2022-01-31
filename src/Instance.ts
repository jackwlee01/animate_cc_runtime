import { Drawable } from "./Drawable";
import { Frame } from "./Frame";
import { DrawableProps } from './Drawable'
import { Matrix } from "./geom/Matrix";
import { JsonColor, JsonFilters } from "./json/AnimationJson";
import { Float } from "./types/Float";


export type InstanceProps = Omit<DrawableProps, 'id' | 'library'> & {
    itemName:string,
    matrix?:Matrix,
    frame:Frame,
    filters?:JsonFilters|null,
    color?:JsonColor|null,
    //position:Vec3,
    //scale:Vec3,
    //rotation:Vec3,
}


export class Instance extends Drawable{

    matrix:Matrix;
    frame:Frame;
    index:number;
    itemName:string;
    filters:JsonFilters|null;
    color:JsonColor|null;
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
        this.matrix = props.matrix || new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        this.filters = props.filters || null;
        this.color = props.color || null;
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