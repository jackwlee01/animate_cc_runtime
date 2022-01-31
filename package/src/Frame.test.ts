import { mockAtlas, mockFrame, mockSprite } from "./test/mocks"

test('createClipInstance', () => {
    const frameA = mockFrame()
    const clip = frameA.library.createClip({ name: "ClipB" })
    const instanceA = frameA.createClipInstance({
        itemName: clip.name,
        name: '0001',
    })
    expect(frameA.instances[0]).toBe(instanceA)

    expect(instanceA.next).toBeUndefined()
    expect(instanceA.prev).toBeUndefined()
    expect(instanceA.item).toBe(clip)

    const frameB = frameA.layer.createFrame({index:frameA.totalFrames, totalFrames: 10, name:'0'})
    const instanceB = frameB.createClipInstance({
        itemName: clip.name,
        name: '0001',
    })

    expect(instanceA.next).toBe(instanceB)
    expect(instanceA.prev).toBeUndefined()
    expect(instanceB.next).toBeUndefined()
    expect(instanceB.prev).toBe(instanceA)

    const frameC = frameA.layer.createFrame({index:frameB.index+frameB.totalFrames, totalFrames: 10, name:'0'})
    const instanceC = frameC.createClipInstance({
        itemName: clip.name,
        name: '0001',
    })

    expect(instanceA.next).toBe(instanceB)
    expect(instanceA.prev).toBeUndefined()
    expect(instanceB.next).toBe(instanceC)
    expect(instanceB.prev).toBe(instanceA)
    expect(instanceC.prev).toBe(instanceB)
    expect(instanceC.next).toBeUndefined()

    const frameD = frameA.layer.createFrame({index:frameC.index+frameC.totalFrames, totalFrames: 10, name:'0'})
    const otherClip = frameA.library.createClip({ name: "ClipC" })
    const instanceD = frameD.createClipInstance({
        itemName: otherClip.name,
        name: '0002'
    })
    expect(instanceC.next).toBeUndefined()
    expect(instanceD.prev).toBeUndefined()
    expect(instanceD.item).toBe(otherClip)
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