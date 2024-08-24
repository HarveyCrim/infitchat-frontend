import { useAuth0 } from "@auth0/auth0-react"
import Navbar from "../components/Navbar"
import DefaultHome from "../components/DefaultHome"
import Messenger from "../components/Messenger"
const Home = () => {
  const {isAuthenticated} = useAuth0()
  
  return (
    <div className="border-2 h-screen">
      <Navbar /> 
       {!isAuthenticated && <DefaultHome />} 
       {isAuthenticated && <Messenger />}
    </div>
  )
}

export default Home