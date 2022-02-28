"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImage = void 0;
const createImage = (src) => new Promise(resolve => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = () => { throw ("Image did not load: " + img.src); };
});
exports.createImage = createImage;
