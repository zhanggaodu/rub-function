import { describe, assert, expect, it, test } from 'vitest'
const foo = (a: number, b: number) => {
  return a + b
}

describe('方法测试', () => {
  it('foo', () => {
    // expect(1 + 1).toEqual(2)
    expect(foo(1,1)).toEqual(2)
    expect(true).to.be.true
  })
})
test.todo('unimplemented test')//显示 1 todo