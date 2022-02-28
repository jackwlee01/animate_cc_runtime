import { Drawable } from "./Drawable";
import { Matrix } from "./geom/Matrix";
export class Instance extends Drawable {
    //position:Vec3;
    //scale:Vec3;
    //rotation:Vec3;
    //filters = new Array<Filter>();
    constructor(props) {
        super(Object.assign(Object.assign({}, props), { library: props.frame.library, id: `${props.frame.id}.${props.frame.instances.length}` }));
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
    get prev() {
        var _a;
        const item = (_a = this.frame.prev) === null || _a === void 0 ? void 0 : _a.instances[this.index];
        return (item === null || item === void 0 ? void 0 : item.itemName) == this.itemName ? item : undefined;
    }
    get next() {
        var _a;
        const item = (_a = this.frame.next) === null || _a === void 0 ? void 0 : _a.instances[this.index];
        return (item === null || item === void 0 ? void 0 : item.itemName) == this.itemName ? item : undefined;
    }
    get item() {
        throw ("Override item getter in base class");
    }
    draw(frame, lerp, callback) {
        this.library.scene.draw(this.item, frame, lerp, callback);
    }
}
