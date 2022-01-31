import { normaliseJson } from "./utilJson";

test('normaliseJson', () => {
    const data = {
        parent:{
            child:{
                Layer_name: "Layer"
            }
        },
        SPRITE: {
            a: 1,
            b: "b",
            c:{
                d:"d"
            }
        },
        SPRITES: [
            {
                Matrix3D: "matrix3D",
            },{
                TIMELINE: "timeline",
            }
        ],
        ATLAS_SPRITE_instance:{
        },

    }

    const result = normaliseJson(data)
    expect(result).not.toBeNull()
    expect(result.parent.child.layerName).toEqual("Layer")
    expect(result.sprite.a).toEqual(1)
    expect(result.sprite.b).toEqual('b')
    expect(result.sprite.c.d).toEqual('d')
    expect(result.sprites[0].matrix3D).toEqual('matrix3D')
    expect(result.sprites[1].timeline).toEqual('timeline')
    expect(result.atlasSpriteInstance).toMatchObject({})
})


