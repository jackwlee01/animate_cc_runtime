"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteInstance = void 0;
const Instance_1 = require("./Instance");
class SpriteInstance extends Instance_1.Instance {
    constructor(props) {
        super(props);
    }
    get item() {
        return this.library.spritesByName[this.itemName];
    }
}
exports.SpriteInstance = SpriteInstance;
