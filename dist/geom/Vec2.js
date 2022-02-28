export class Vec2 {
    constructor(props) {
        this.x = props.x;
        this.y = props.y;
        this.data = new Float32Array([this.x, this.y]);
    }
}
