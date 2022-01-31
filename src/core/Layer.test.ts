import { mockLayer } from "./test/mocks"


test('createFrame', () => {
    const layer = mockLayer()

    expect(layer.keyframeAt(15)).toBeNull()
    expect(layer.clip.totalFrames).toEqual(0)
    expect(layer.firstFrame).toBeUndefined()
    expect(layer.lastFrame).toBeUndefined()

    const frameA = layer.createFrame({
        index: 0,
        totalFrames: 10,
        name: '0',
    })

    expect(layer.frames.length).toEqual(1)
    expect(layer.framesByName['0']).toBe(frameA)
    expect(layer.keyframeAt(5)).toBe(frameA)
    expect(layer.keyframeAt(15)).toBe(frameA)
    expect(layer.keyframeAt(-15)).toBe(frameA)
    expect(layer.clip.totalFrames).toEqual(10)
    expect(layer.clip.framesById['lib.clips.ClipA.Layer.0']).toEqual(frameA)
    expect(layer.firstFrame).toBe(frameA)
    expect(layer.lastFrame).toBe(frameA)

    const frameB = layer.createFrame({
        index: 10,
        totalFrames: 5,
        name: '1',
        labelName: "MyLabel",
    })

    expect(layer.frames.length).toEqual(2)
    expect(layer.framesByName['1']).toBe(frameB)
    expect(layer.totalFrames).toEqual(15)
    expect(layer.keyframeAt(5)).toBe(frameA)
    expect(layer.keyframeAt(-5)).toBe(frameB)
    expect(layer.keyframeAt(12)).toBe(frameB)
    expect(layer.keyframeAt(-12)).toBe(frameA)
    expect(layer.clip.totalFrames).toEqual(15)
    expect(layer.clip.framesByLabel['MyLabel']).toBe(frameB)
    expect(layer.firstFrame).toBe(frameA)
    expect(layer.lastFrame).toBe(frameB)
    expect(frameA.next).toBe(frameB)
    expect(frameA.prev).toBeUndefined()
    expect(frameB.next).toBeUndefined()
    expect(frameB.prev).toBe(frameA)

    const frameC = layer.createFrame({
        index: 15,
        totalFrames: 5,
        name: '2',
    })

    expect(layer.firstFrame).toBe(frameA)
    expect(layer.lastFrame).toBe(frameC)
    expect(frameA.next).toBe(frameB)
    expect(frameA.prev).toBeUndefined()
    expect(frameB.next).toBe(frameC)
    expect(frameB.prev).toBe(frameA)
    expect(frameC.next).toBeUndefined()
    expect(frameC.prev).toBe(frameB)
})