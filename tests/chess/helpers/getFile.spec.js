import { getFile } from '~/chess/helpers'

describe('#getFile', () => {
  it('get a file', () => {
    expect(getFile(1)).toEqual('a')
    expect(getFile(2)).toEqual('b')
    expect(getFile(7)).toEqual('g')
    expect(getFile(8)).toEqual('h')
  })
})
