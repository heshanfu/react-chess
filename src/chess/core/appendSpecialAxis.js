import { compose, curry, reject, concat } from 'ramda'
import { isEmpty } from '~/utils'
import _applyDoubleStep from './internal/_applyDoubleStep'
import _applyEnPassant from './internal/_applyEnPassant'

/**
 * Append special axis before moving to tile
 * @param  {string} side
 * @param  {Array}  special
 * @param  {string} tile
 * @param  {Array}  timeline
 * @param  {Array}  movableAxis
 * @return {Array}
 */
function appendSpecialAxis (side, special, tile, timeline, movableAxis) {
  const [snapshot] = timeline
  let nextMovableAxis = [...movableAxis]

  if (special.length > 1) {
    const enPassantAxis = _applyEnPassant(side, tile, timeline)
    const doubleStepAxis = _applyDoubleStep(side, tile, special)(
      snapshot,
      movableAxis
    )

    nextMovableAxis = compose(
      reject(isEmpty),
      concat(enPassantAxis)
    )(doubleStepAxis)
  }

  return nextMovableAxis
}

export default curry(appendSpecialAxis)
