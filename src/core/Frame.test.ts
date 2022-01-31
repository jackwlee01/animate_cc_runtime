import { Matrix } from "./geom/Matrix"
import { mockFrame } from "./test/mocks"

test('createClipInstance', () => {
    const frame = mockFrame()
    const clip = frame.library.createClip({ name: "ClipB" })
    const instance = frame.createClipInstance({
        itemName: clip.name,
        name: '0001',
    })
    expect(frame.instances[0]).toBe(instance)
})
