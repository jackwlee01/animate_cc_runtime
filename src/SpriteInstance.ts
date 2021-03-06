import { Instance, InstanceProps } from "./Instance";


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
