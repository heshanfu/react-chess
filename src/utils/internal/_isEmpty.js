import _detectEmpty from './_detectEmpty'

/**
 * @param  {string}   fnName
 * @return {Function}
 */
function _isEmpty (fnName) {
  return (...x) => {
    const fn = x[fnName].bind(x)

    return fn((v) => _detectEmpty(v))
  }
}

export default _isEmpty
