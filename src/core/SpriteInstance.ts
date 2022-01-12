import { Drawable } from "./Drawable";
import { Instance, InstanceProps } from "./Instance";

type Float = number;

export type SpriteInstanceProps = InstanceProps & {

}


export class SpriteInstance extends Instance{

    constructor(props:SpriteInstanceProps){
        super(props)
    }

    
    public get item(){
        return this.library.spritesByName[this.itemName];
    }


}
