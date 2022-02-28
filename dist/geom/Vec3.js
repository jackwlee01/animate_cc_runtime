export class Vec3 {
    constructor(props) {
        this.x = props.x;
        this.y = props.y;
        this.z = props.z;
        this.data = new Float32Array([this.x, this.y, this.z]);
    }
}
