"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockSprite = exports.mockAtlas = exports.mockFrame = exports.mockLayer = exports.mockClip = exports.mockLib = exports.mockScene = exports.mockPixelData = exports.mockImage = void 0;
const Scene_1 = require("../Scene");
const mockImage = () => ({ complete: true });
exports.mockImage = mockImage;
const mockPixelData = () => ({});
exports.mockPixelData = mockPixelData;
const mockScene = () => new Scene_1.Scene();
exports.mockScene = mockScene;
const mockLib = () => (0, exports.mockScene)().createLibrary('lib', './xxx');
exports.mockLib = mockLib;
const mockClip = (name) => (0, exports.mockLib)().createClip({ name: name || "ClipA" });
exports.mockClip = mockClip;
const mockLayer = (name) => (0, exports.mockClip)().createLayer({ name: name || 'Layer', type: 'Normal', clippedBy: null });
exports.mockLayer = mockLayer;
const mockFrame = () => (0, exports.mockLayer)().createFrame({ name: "layer_0", labelName: undefined, index: 0, totalFrames: 10, });
exports.mockFrame = mockFrame;
const mockAtlas = (library) => (library || (0, exports.mockLib)()).createAtlas({
    image: (0, exports.mockImage)(),
    app: "My App",
    version: "0.0.1",
    imagePath: './xxx',
    format: "png",
    size: { w: 1920, h: 1080 },
    resolution: '1x'
}, (0, exports.mockPixelData)());
exports.mockAtlas = mockAtlas;
const mockSprite = (atlas) => atlas.library.createSprite(atlas, { name: '0000', x: 0, y: 0, width: 100, height: 100, rotated: false });
exports.mockSprite = mockSprite;
