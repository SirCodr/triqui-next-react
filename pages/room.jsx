import Board from "@/components/Board"
import PlayerCard from "@components/PlayerCard"

import styles from "../styles/Home.module.css"
import useBoard from "@/hooks/useBoard"

const Room = () => {
  const {
    states: { board },
    actions: { modifySpot, restartGame },
  } = useBoard()

  return (
    <div className={styles.appContainer}>
      <div className={styles.appWrapper}>
        <div
          className="horizontal-wrapper"
          style={{ display: "flex", alignItems: "center" }}
        >
          <PlayerCard
            isCurrentPlayer={0 === board.currentPlayer.indexPos}
            player={board.players.get(0)}
          />
          <Board
            spots={board.spots}
            currentPlayer={board.currentPlayer}
            nextPlayer={board.nextPlayer}
            modifySpot={modifySpot}
          />
          <PlayerCard
            isCurrentPlayer={1 === board.currentPlayer.indexPos}
            player={board.players.get(1)}
          />
        </div>
        <button onClick={restartGame}>Restart</button>
      </div>
    </div>
  )
}

export default Room
