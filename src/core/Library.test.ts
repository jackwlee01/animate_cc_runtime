import { mockAtlas, mockLib } from "./test/mocks"



test("new Library", () => {
    const lib = mockLib()
    
    expect(lib.atlases).not.toBeNull()
    expect(lib.atlasesBySpriteName).not.toBeNull()
    expect(lib.clips).not.toBeNull()
    expect(lib.clipsByName).not.toBeNull()
    expect(lib.spritesByName).not.toBeNull()
    expect(lib.scene).not.toBeNull()
})


test("createAtlas", () => {
    const atlas = mockAtlas()
    expect(atlas).not.toBeNull()
    expect(atlas.library).not.toBeNull()
})