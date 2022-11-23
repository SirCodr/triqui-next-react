import React, { useEffect, useState } from "react"
import Spot from "./Spot"

import styles from "../styles/Board.module.css"

const Board = (props) => {
  const { spots, currentPlayer, nextPlayer, modifySpot } = props
  return (
    <div className={styles.board}>
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className={styles.spot} onClick={() => modifySpot(i, currentPlayer)}>
          <div className="ghost">
            {!spots.has(i) && currentPlayer.spots && currentPlayer.spots.skin}
          </div>
          {spots.has(i) && <Spot spotSkin={spots.get(i).spots.skin} /> }
        </div>
      ))}
    </div>
  )
}

export default Board
