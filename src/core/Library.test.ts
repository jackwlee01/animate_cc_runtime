import { mockAtlas, mockImage, mockLib, mockPixelData, mockScene } from "./test/mocks"


test("new Library", () => {
    const scene = mockScene();
    const lib = scene.createLibrary('lib', './xxx')
    
    expect(lib.atlases).not.toBeNull()
    expect(lib.atlasesBySpriteName).not.toBeNull()
    expect(lib.clips).not.toBeNull()
    expect(lib.clipsByName).not.toBeNull()
    expect(lib.spritesByName).not.toBeNull()
    expect(lib.scene).not.toBeNull()
})


test("createAtlas", () => {
    const lib = mockLib()
    const atlas = lib.createAtlas({
        image: mockImage(), // Just mock the image
        app: "My App",
        version: "0.0.1",
        imagePath: './xxx',
        format: "png",
        size: { w:1920, h:1080 },
        resolution: '1x'
    }, mockPixelData())
    
    expect(atlas).not.toBeNull()
    expect(atlas.library).not.toBeNull()
})


test("createClip", () => {
    const lib = mockLib()
    const clip = lib.createClip({
        name: "ClipA"
    })
    expect(lib.clips.length).toEqual(1)
    expect(lib.clipsByName['ClipA']).toBe(clip)
    expect(lib.symbol("ClipA")).toBe(clip)
})


test("createSprite", () => {
    const atlas = mockAtlas()
    const lib = atlas.library;
    const sprite = lib.createSprite(atlas, {
        name: "0001",
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        rotated: false,
    })
    expect(lib.symbol("0001")).toBe(sprite)
    expect(lib.spritesByName["0001"]).toBe(sprite)
})