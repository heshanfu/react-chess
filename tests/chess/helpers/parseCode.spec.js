import { parseCode } from '~/chess/helpers'

describe('#parseCode', () => {
  it('divides a code as single character', () => {
    expect(parseCode('bRa8')).toEqual({
      piece: 'R',
      side: 'b',
      file: 'a',
      rank: '8'
    })
  })
})
