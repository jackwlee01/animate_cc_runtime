import { Library } from "./Library";
export class Scene {
    constructor() {
        this.draw = null; // OVERRIDE THIS IN THE BASE CLASS!
        this.drawImage = null;
        this.pixelData = {};
        this.libraries = {};
    }
    get mouseX() {
        throw ("Override mouseX in base class");
    }
    get mouseY() {
        throw ("Override mouseY in base class");
    }
    createLibrary(name, path) {
        const library = new Library(name, path, this);
        this.libraries[name] = library;
        return library;
    }
    library(name) {
        if (!this.libraries[name])
            throw ("Library does not exist: " + name);
        return this.libraries[name];
    }
    getPixelData(image) {
        if (image.complete == false)
            throw ("Image has not loaded!");
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        return {
            ctx,
            imageData,
            image,
        };
    }
}
