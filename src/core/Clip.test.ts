import { Clip, Frame } from ".."
import { mockClip, mockLayer, mockLib } from "./test/mocks"


test('createLayer', () => {
    const clip = mockClip()
    const layer = clip.createLayer({
        name: "layer_0",
        type: 'Normal',
    })
    expect(clip.layers.length).toEqual(1)
    expect(clip.layers[0]).toBe(layer)
    expect(clip.layersByName['layer_0']).toBe(layer)
    expect(clip.layersById['lib.clips.ClipA.layer_0']).toEqual(layer)
})
