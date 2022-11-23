import { signal } from "@preact/signals"

const context = () => {
  const currentPlayer = signal(0)
  const spots = signal(new Map())
  
  function setSpots(value){
    spots.value = value
    console.log('s')
  }

  function setCurrentPlayer(value){
    currentPlayer.value = value
  }

  return {spots, setSpots, currentPlayer, setCurrentPlayer}
}

export default context