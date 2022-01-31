import { modWrap } from "../../core/util/math";

const a = modWrap(1, 2)


function sum(a:number, b:number){
    return a + b
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

