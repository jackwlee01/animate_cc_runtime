"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
const Library_1 = require("./Library");
class Scene {
    constructor() {
        this.draw = null; // OVERRIDE THIS IN THE BASE CLASS!
        this.drawImage = null;
        this.pixelData = {};
    }
    get mouseX() {
        throw ("Override mouseX in base class");
    }
    get mouseY() {
        throw ("Override mouseY in base class");
    }
    createLibrary(name, path) {
        const library = new Library_1.Library(name, path, this);
        return library;
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
exports.Scene = Scene;
