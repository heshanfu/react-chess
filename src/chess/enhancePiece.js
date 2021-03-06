import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import memoize from 'memoize-one'
import { boundMethod } from 'autobind-decorator'
import { curry } from 'ramda'
import { noop } from '~/utils'
import { getSide } from '~/chess/helpers'

/**
 * Higher order component for Chess piece
 * - Chess pieces from svg loader
 * - that is not defining prop types, events and life cycle methods
 * @see getPiece.js
 * @param  {Component} WrappedComponent svg-react-loader
 * @param  {string}    staticKey
 * @param  {string}    staticTurn
 * @return {Component}
 */
function enhancePiece (WrappedComponent, staticKey, staticTurn) {
  class Piece extends Component {
    static displayName = `enhancePiece(${WrappedComponent.name})`

    static propTypes = {
      turn: PropTypes.string.isRequired,
      tile: PropTypes.string.isRequired,
      selectedPiece: PropTypes.string,
      selectedSide: PropTypes.string,
      selectedFile: PropTypes.string,
      selectedRank: PropTypes.string,
      isMovable: PropTypes.bool,
      setMovable: PropTypes.func,
      setCapturedNext: PropTypes.func
    }

    static defaultProps = {
      isMovable: false,
      setMovable: noop,
      setCapturedNext: noop
    }

    getSelectedTile = memoize(
      (selectedFile, selectedRank) => `${selectedFile}${selectedRank}`
    )

    getStaticSide = memoize(getSide)

    @boundMethod
    handleClick (evt) {
      evt.preventDefault()

      const {
        isMovable,
        turn,
        tile,
        selectedPiece,
        selectedSide,
        selectedFile,
        selectedRank,
        setMovable,
        setCapturedNext
      } = this.props

      const selectedTile = this.getSelectedTile(selectedFile, selectedRank)
      const isTurn = this.getStaticSide(staticTurn) === turn
      const isCapturable = isMovable && !isTurn

      if (isTurn) {
        setMovable(tile)
      }

      if (isCapturable) {
        setCapturedNext({
          selectedTile,
          capturedTile: tile,
          replaceCode: `${selectedSide}${selectedPiece}${tile}`
        })
      }
    }

    render () {
      const { turn, tile, selectedFile, selectedRank, isMovable } = this.props
      const selectedTile = this.getSelectedTile(selectedFile, selectedRank)
      const isTurn = this.getStaticSide(staticTurn) === turn
      const isCapturable = isMovable && !isTurn
      const cls = cx({
        'is-turn': isTurn,
        'is-capturable': isCapturable,
        'is-selected': selectedTile === tile
      })

      return (
        <div className={cls} onClick={this.handleClick}>
          <WrappedComponent key={`${staticKey}-${tile}`} />
        </div>
      )
    }
  }

  return Piece
}

export default curry(enhancePiece)
