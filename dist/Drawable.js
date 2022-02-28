export class Drawable {
    constructor(props) {
        this.totalFrames = 1;
        this.name = props.name;
        this.id = props.id;
        this.totalFrames = props.totalFrames;
        this.library = props.library;
    }
    get scene() {
        return this.library.scene;
    }
    draw(frame, lerp, callback) {
        // Override in base class
    }
}
