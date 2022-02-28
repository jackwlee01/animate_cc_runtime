import { Instance } from "./Instance";
export class SpriteInstance extends Instance {
    constructor(props) {
        super(props);
    }
    get item() {
        return this.library.spritesByName[this.itemName];
    }
}
