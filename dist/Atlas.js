export class Atlas {
    constructor(props) {
        this.sprites = [];
        this.library = props.library;
        this.image = props.image;
        this.app = props.app;
        this.version = props.version;
        this.imagePath = props.imagePath;
        this.format = props.format;
        this.size = props.size;
        this.resolution = props.resolution;
        this.pixelData = props.pixelData;
        // this.library.scene.getPixelData(this.image) // TODO: Determine if this should be a lazy operation
    }
    getPixel(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        let i = x + (y * this.pixelData.imageData.width);
        const data = this.pixelData.imageData.data;
        return [
            data[(i * 4) + 0],
            data[(i * 4) + 1],
            data[(i * 4) + 2],
            data[(i * 4) + 3],
        ];
    }
}
