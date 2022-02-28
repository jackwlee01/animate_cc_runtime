import { Scene } from "../Scene";
export const mockImage = () => ({ complete: true });
export const mockPixelData = () => ({});
export const mockScene = () => new Scene();
export const mockLib = () => mockScene().createLibrary('lib', './xxx');
export const mockClip = (name) => mockLib().createClip({ name: name || "ClipA" });
export const mockLayer = (name) => mockClip().createLayer({ name: name || 'Layer', type: 'Normal', clippedBy: null });
export const mockFrame = () => mockLayer().createFrame({ name: "layer_0", labelName: undefined, index: 0, totalFrames: 10, });
export const mockAtlas = (library) => (library || mockLib()).createAtlas({
    image: mockImage(),
    app: "My App",
    version: "0.0.1",
    imagePath: './xxx',
    format: "png",
    size: { w: 1920, h: 1080 },
    resolution: '1x'
}, mockPixelData());
export const mockSprite = (atlas) => atlas.library.createSprite(atlas, { name: '0000', x: 0, y: 0, width: 100, height: 100, rotated: false });
