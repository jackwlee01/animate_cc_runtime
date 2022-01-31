import { Matrix2d } from "./geom/Matrix2d"
import { Matrix } from "./geom/Matrix"
import { Vec2 } from "./geom/Vec2"
import { mockClip, mockFrame } from "./test/mocks"

test('createClipInstance', () => {
    const frame = mockFrame()
    const clip = frame.library.createClip({ name: "ClipB" })
    const instance = frame.createClipInstance({
        itemName: clip.name,
        name: '0001',
        matrix2d: new Matrix2d(1, 0, 0, 1, 0, 0),
        matrix3d: new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
    })

})