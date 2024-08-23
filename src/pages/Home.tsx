import { useAuth0 } from "@auth0/auth0-react"
import Navbar from "../components/Navbar"
import DefaultHome from "../components/DefaultHome"
import Messenger from "../components/Messenger"
import {io} from "socket.io-client"
import { useEffect } from "react"
import { setSocket } from "../redux/userSlice"
import { useDispatch } from "react-redux"
import { useQueryClient } from "@tanstack/react-query"
const Home = () => {
  const dispatch = useDispatch()
  const {isAuthenticated} = useAuth0()
  const client = useQueryClient()
  useEffect(() => {
    if(!isAuthenticated){
      return
    }
    const socket = io(import.meta.env.VITE_BACKEND_URL, {
      auth: {
        token: JSON.parse(localStorage.getItem("token") as string)
      }
    })
    socket.on("connect", () => {
      console.log(socket.id)
      dispatch(setSocket(socket))
    })

    socket.on("notificationReceived", (data) => {
      if(data.type == "request"){
        client.invalidateQueries({queryKey: ["getUser"]})
        
      }
    })

    socket.on("acceptHandler", () => {
      client.invalidateQueries({queryKey: ["getUser"]})
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