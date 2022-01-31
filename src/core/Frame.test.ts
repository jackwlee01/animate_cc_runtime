import { Matrix } from "./geom/Matrix"
import { mockAtlas, mockFrame, mockSprite } from "./test/mocks"

test('createClipInstance', () => {
    const frame = mockFrame()
    const clip = frame.library.createClip({ name: "ClipB" })
    const instance = frame.createClipInstance({
        itemName: clip.name,
        name: '0001',
    })
    expect(frame.instances[0]).toBe(instance)
})


test('createSpriteInstance', () => {
    const frame = mockFrame()
    const atlas = mockAtlas(frame.library)
    const sprite = mockSprite(atlas)
    const instance = frame.createSpriteInstance({
        itemName: sprite.name,
        name: "0001"
    })
    expect(frame.instances[0]).toBe(instance)
})