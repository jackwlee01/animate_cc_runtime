import { Scene } from "./Scene"

test("createLibrary", () => {
    const scene = new Scene()
    const libA = scene.createLibrary('libA', './xxx')
    const libB = scene.createLibrary('libA', './xxx')

    expect(libA).not.toBeNull()
    expect(libB).not.toBeNull()
})