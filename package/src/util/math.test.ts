import { modWrap } from "./math"

test('modWrap', () => {    
    expect(modWrap(0, 2)).toEqual(0)
    expect(modWrap(4, 2)).toEqual(0)
    expect(modWrap(5, 2)).toEqual(1)
    expect(modWrap(-4, 2)).toEqual(0)
    expect(modWrap(-5, 2)).toEqual(1)
})

