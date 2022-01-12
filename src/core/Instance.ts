import { Clip } from "./Clip";
import { Drawable } from "./Drawable";
import { Frame } from "./Frame";
import { Matrix2d } from "./geom/Matrix2d";
import { Vec2 } from "./geom/Vec2";
import { Vec3 } from "./geom/Vec3";
import { Sprite } from "./Sprite";
import { DrawableProps } from './Drawable'


export type InstanceProps = Omit<DrawableProps, 'id' | 'library'> & {
    itemName:string,
    matrix2d:Matrix2d,
    position:Vec3,
    scale:Vec3,
    rotation:Vec3,
    frame:Frame,
}


export class Instance extends Drawable{

    matrix2d:Matrix2d;
    position:Vec3;
    scale:Vec3;
    rotation:Vec3;
    frame:Frame;
    //filters = new Array<Filter>();
    index:number;
    itemName:string;

    
    constructor(props:InstanceProps){
        super({
            ...props,
            library: props.frame.library,
            id: `${props.frame.id}.${props.frame.instances.length}`,
        });

        this.itemName = props.itemName;
        this.matrix2d = props.matrix2d;
        this.position = props.position;
        this.scale = props.scale;
        this.rotation = props.rotation;

        this.frame = props.frame;
        this.index = this.frame.instances.length;
    }

}