import { useAuth0 } from "@auth0/auth0-react"
import Navbar from "../components/Navbar"
import DefaultHome from "../components/DefaultHome"
import Messenger from "../components/Messenger"
import {io} from "socket.io-client"
import { useEffect } from "react"
const Home = () => {
  const {isAuthenticated} = useAuth0()
  useEffect(() => {
    if(!isAuthenticated){
      return
    }
    const socket = io(import.meta.env.VITE_BACKEND_URL, {
      auth: {
        token: JSON.parse(localStorage.getItem("token") as string)
      }
    })
    socket.on("message", (data) => {
    })
    return () => {
      socket.disconnect()
    }
  },[isAuthenticated])
  
  return (
    <div className="border-2 h-screen">
      <Navbar /> 
       {!isAuthenticated && <DefaultHome />} 
       {isAuthenticated && <Messenger />}
    </div>
  )
}

export default Home