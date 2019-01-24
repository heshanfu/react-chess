import { compose, pipe, extractFromObj, trace } from '../../src/utils/fp'

describe('utils/fp.js', () => {
  const _plus = (a) => (b) => a + b
  const _minus = (a) => (b) => a - b
  const _multiply = (a) => (b) => a * b
  const _devide = (a) => (b) => a / b

  describe('#compose', () => {
    it('Compose functions', () => {
      const result = compose(
        _devide(200),
        _multiply(5),
        _minus(105),
        _plus(1)
      )(100)

      expect(result).toEqual(10)
    })
  })

  describe('#pipe', () => {
    it('Compose functions', () => {
      const result = pipe(
        _devide(200),
        _multiply(5),
        _minus(105),
        _plus(1)
      )(100)

      expect(result).toEqual(96)
    })
  })

  describe('#extractFromObj', () => {
    it('Extract value from onject', () => {
      expect(extractFromObj('a')({ a: 1, b: 2, c: 3 })).toEqual(1)
      expect(extractFromObj('c')({ a: 1, b: 2, c: 3 })).toEqual(3)
    })
  })

  describe('#trace', () => {
    it('Trace log while composing', () => {
      const v = {}

      expect(trace('trace')(v)).toEqual(v)
    })
  })
})
