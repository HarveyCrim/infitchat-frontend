import { Avatar } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSocketContext } from "../context/socketContext"

const SidebarCard = ({isOnline, profile_pic, id, name, lastMessage, unread} : {isOnline: boolean, id: string, profile_pic: string, name: string, lastMessage: string, unread?: number}) => {
  const location = useLocation()
  const [onlineStatus, setOnlineStatus] = useState<boolean>(isOnline)
  const picked = location.pathname.substring(6)
  const socket = useSocketContext()!
  useEffect(() => {
    socket.on("onlineStatus", (data) => {
        if(id == data){
            setOnlineStatus(true)
        }
    })
    socket.on("offlineStatus", (data) => {
        if(id == data){
            setOnlineStatus(false)
        }
    })

    return () => {
        socket.off("onlineStatus")
        socket.off("offlineStatus")
    }
  })

  return (
    <Link to = {`/chat/${id}`}>
        <div className={`flex hover:bg-gray-200 ${id === picked ? "bg-gray-200":""} items-center justify-between px-4 py-4 border`}>
            <div className="flex gap-2">
                <div className="relative">
                    <Avatar sx = {{width: "50px", height: "50px" ,border: "3px solid gray"}} src = {profile_pic}/>
                    {onlineStatus && <div className="absolute bg-green-500 h-[14px] w-[14px] rounded-full right-[0px] bottom-[-2px]"></div>}
                </div>
                <div>
                    <p className="font-medium">{name}</p>
                    <p className="font-medium text-gray-400">{lastMessage}</p>
                </div>
            </div>
            <div className="rounded-full h-[35px] w-[35px] font-bold text-white bg-black flex items-center justify-center">{unread}</div>
        </div>
    </Link>
  )
}

export default SidebarCard