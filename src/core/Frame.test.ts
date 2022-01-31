import { Matrix } from "./geom/Matrix"
import { mockFrame } from "./test/mocks"

test('createClipInstance', () => {
    const frame = mockFrame()
    const clip = frame.library.createClip({ name: "ClipB" })
    const instance = frame.createClipInstance({
        itemName: clip.name,
        name: '0001',
        matrix: new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
    })

})