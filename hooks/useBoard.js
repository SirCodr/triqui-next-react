import React, { useCallback, useEffect, useState } from "react"
import Circulo from "@components/icons/image01.svg"
import Equis from "@components/icons/image02.svg"

const useBoard = (props) => {
  const [board, setBoard] = useState({
    spots: new Map(),
    players: new Map(),
    currentPlayer: {},
    nextPlayer: {},
    game: {
      on: true,
    },
  })

  const getNewPlayerSpot = (players, currentPlayer, spotPos) => {
    const draftPlayers = new Map(players)
    draftPlayers.get(currentPlayer.indexPos).spots.data.push(spotPos)

    return draftPlayers
  }

  const modifySpot = useCallback(
    (position, value) => {
      const spotsDraft = new Map(board.spots)

      if (spotsDraft.has(position) || !board.game.on) {
        return false
      }

      spotsDraft.set(position, value)

      const newPlayerSpot = getNewPlayerSpot(
        board.players,
        board.currentPlayer,
        position
      )

      setBoard({
        ...board,
        spots: spotsDraft,
        players: newPlayerSpot,
        currentPlayer: getNextPlayer(),
        nextPlayer: board.currentPlayer
      })
    },
    [board]
  )

  const getNextPlayer = useCallback(() => {
    if (!board.players.size && !board.currentPlayer) return null

    const currentPlayerIndex = Array.from(board.players.values()).findIndex(
      (player) => player.name === board.currentPlayer.name
    )
    const nextPlayerIndex = currentPlayerIndex === 0 ? 1 : 0

    return board.players.get(nextPlayerIndex)
  }, [board])

  const restartGame = () => {
    setBoard({ ...board, spots: new Map(), game: { ...board.game, on: true } })
  }

  const isJugadaGanadora = useCallback(() => {
    const { spots } = board

    const getMatchSpots = (spots) => {
      if (
        spots.has(0) &&
        spots.has(1) &&
        spots.has(2) &&
        spots.get(0) === spots.get(1) &&
        spots.get(0) === spots.get(2)
      )
        return spots.get(0)

      if (
        spots.has(3) &&
        spots.has(4) &&
        spots.has(5) &&
        spots.get(3) === spots.get(4) &&
        spots.get(3) === spots.get(5)
      )
        return spots.get(3)

      if (
        spots.has(6) &&
        spots.has(7) &&
        spots.has(8) &&
        spots.get(6) === spots.get(7) &&
        spots.get(6) === spots.get(8)
      )
        return spots.get(6)

      if (
        spots.has(0) &&
        spots.has(3) &&
        spots.has(6) &&
        spots.get(0) === spots.get(3) &&
        spots.get(0) === spots.get(6)
      )
        return spots.get(0)

      if (
        spots.has(1) &&
        spots.has(4) &&
        spots.has(7) &&
        spots.get(1) === spots.get(4) &&
        spots.get(1) === spots.get(7)
      )
        return spots.get(1)

      if (
        spots.has(2) &&
        spots.has(5) &&
        spots.has(8) &&
        spots.get(2) === spots.get(5) &&
        spots.get(2) === spots.get(8)
      )
        return spots.get(2)

      if (
        spots.has(0) &&
        spots.has(4) &&
        spots.has(8) &&
        spots.get(0) === spots.get(4) &&
        spots.get(0) === spots.get(8)
      )
        return spots.get(0)

      if (
        spots.has(2) &&
        spots.has(4) &&
        spots.has(6) &&
        spots.get(2) === spots.get(4) &&
        spots.get(2) === spots.get(6)
      )
        return spots.get(2)
    }

    const matchSpots = getMatchSpots(spots)

    if (matchSpots !== undefined) return true

    return false
  }, [board])

  const validarGanador = useCallback(() => {
    const MINIMO_JUGADAS_TRIQUI = 5

    if (board.spots.size < MINIMO_JUGADAS_TRIQUI) {
      return false
    }

    return isJugadaGanadora()
  }, [board])

  const finishRound = () => {
    setBoard({ ...board, game: { ...board.game, on: false } })
  }

  useEffect(() => {
    let draftPlayers, currentPlayer, nextPlayer

    // if(props && !props.isOnlineGame){
    draftPlayers = board.players
      .set(0, {
        name: "Jugador 1",
        nickname: 'Pepito',
        points: 0,
        spots: {
          data: [],
          skin: <Circulo />,
          value: 0
        },
        indexPos: 0,
      })
      .set(1, {
        name: "Jugador 2",
        nickname: 'Fulanito',
        points: 0,
        spots: {
          data: [],
          skin: <Equis />,
          value: 0
        },
        indexPos: 1,
      })
    currentPlayer = draftPlayers.get(0)
    nextPlayer = draftPlayers.get(1)
    // }

    setBoard({ ...board, players: draftPlayers, currentPlayer, nextPlayer })
  }, [])

  useEffect(() => {
    const isGanador = validarGanador()

    if (isGanador) {
      finishRound()
      setTimeout(() => alert("GANASTE"), 1001)
    }
  }, [board.spots])

  return {
    states: { board },
    actions: { modifySpot, restartGame },
  }
}

export default useBoard
