import { useAuth0 } from "@auth0/auth0-react"
import Navbar from "../components/Navbar"
import DefaultHome from "../components/DefaultHome"

const Home = () => {
  const {isAuthenticated} = useAuth0()
  return (
    <div className="">
      <Navbar />
      {!isAuthenticated && <DefaultHome />}

    </div>
  )
}

export default Home