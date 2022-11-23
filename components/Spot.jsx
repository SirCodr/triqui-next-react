import React from "react"

import styles from "../styles/Board.module.css"

const Spot = (props) => {
  const {spotSkin} = props
  return(
    <div>
      {spotSkin}
    </div>
  )
  // return <img alt='icon' src={<skinSpot />} />
}

export default Spot
