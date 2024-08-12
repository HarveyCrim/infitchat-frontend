import { useAuth0 } from "@auth0/auth0-react"
import Navbar from "../components/Navbar"
import DefaultHome from "../components/DefaultHome"
import ChatLayout from "../components/ChatLayout"

const Home = () => {
  const {isAuthenticated} = useAuth0()
  return (
    <div>
      <Navbar />
      {!isAuthenticated && <DefaultHome />}
      {isAuthenticated && <ChatLayout />}
    </div>
  )
}

export default Home