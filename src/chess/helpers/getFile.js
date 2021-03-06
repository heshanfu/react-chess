import { FILES } from '~/chess/constants'

/**
 * Get file char
 * @param  {number} fileNum
 * @return {string}
 */
function getFile (fileNum) {
  return FILES[fileNum - 1]
}

export default getFile
