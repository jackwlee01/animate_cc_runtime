import { Scene } from "../Scene";

export const mockImage = () => ({complete:true} as HTMLImageElement)
export const mockPixelData = () => ({} as ReturnType<Scene['getPixelData']>)
export const mockScene = () => new Scene();
export const mockLib = () => mockScene().createLibrary('lib', './xxx')
export const mockClip = () => mockLib().createClip({name:"ClipA"})
export const mockAtlas = () => mockLib().createAtlas({
    image: mockImage(), // Just mock the image
    app: "My App",
    version: "0.0.1",
    imagePath: './xxx',
    format: "png",
    size: { w:1920, h:1080 },
    resolution: '1x'
}, mockPixelData())
