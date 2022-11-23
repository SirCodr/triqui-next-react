const PlayerCard = ({ player, isCurrentPlayer }) => {

  if(!player) return <></>

  return (
    <div className="player-card-environment">
      <div className="turn-container">
        {isCurrentPlayer && 'Your turn'}
      </div>
      <div className="player-card-container">
        <span>{player.name}</span>
        <span>{player.nickname}</span>
        {/* {player.spotSkin} */}
        {player.spots.skin}
      </div>
    </div>
  )
}

export default PlayerCard
