
import MessageWindow from "./MessageWindow"
import Sidebar from "./Sidebar"
import { useEffect } from "react"
import { useSocketContext } from "../context/socketContext"
import { useQueryClient } from "@tanstack/react-query"
import { setSocket } from "../redux/userSlice"
import { useDispatch } from "react-redux"
const Messenger = () => {
    const socket = useSocketContext()!
    // console.log(socket)
    const dispatch = useDispatch()
    const client = useQueryClient()
    useEffect(() => {
        socket.on("connect", () => {
        //   console.log(socket)
          dispatch(setSocket(socket))
        })
        socket.on("notificationReceived", (data: any) => {
          if(data.type == "request"){
            client.invalidateQueries({queryKey: ["getUser"]})
          }
        })
    
        socket.on("acceptHandler", () => {
          client.invalidateQueries({queryKey: ["getUser"]})
        })
    
        return () => {
          socket.off("notificationReceived")
          socket.off("acceptHandler")
          socket.off("acceptHandler")
        }
      }, [])
  return (
    <div className="flex h-[calc(100vh-85px)]">
        <div className="w-[35%]"> 
            <Sidebar />
        </div>
        <div className="w-[65%]">
            <MessageWindow/>
        </div>
    </div>
  )
}

export default Messenger