import styles from "../styles/Home.module.css"
import useBoard from "@/hooks/useBoard"
import Link from "next/link"

const Home = () => {
  const {
    states: { board },
    actions: { modifySpot, restartGame },
  } = useBoard()

  return (
    <div className={styles.appContainer}>
      <div className={styles.appWrapper}>
        <Link href="/room">Local</Link>
        <Link href="/room?con=multijugador">Multijugador</Link>
        <Link href="/room?con=1pc">1 vs pc</Link>
      </div>
    </div>
  )
}

export default Home
