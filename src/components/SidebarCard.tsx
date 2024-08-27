import { Avatar } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { useSocketContext } from "../context/socketContext"
import { removeUnread } from "../api/convoApi"

const SidebarCard = ({sender, lastMessageByYou, isOnline, profile_pic, id, name, lastMessage, unread} : {sender: string, lastMessageByYou: boolean, isOnline: boolean, id: string, profile_pic: string, name: string, lastMessage: string, unread: number}) => {
  const location = useLocation()
  const [onlineStatus, setOnlineStatus] = useState<boolean>(isOnline)
  const [messageLast, setMessageLast] = useState<string>(lastMessage)
  const [notSeen, setNotSeen] = useState<number>(unread)
  const [lastSender, setLastSender] = useState<boolean>(lastMessageByYou)
  const {chatId} = useParams()
  const picked = location.pathname.substring(6)
  const socket = useSocketContext()!
  console.log(messageLast, "lastMessage")
  console.log(lastSender, "lastMessageByYou")
  useEffect(() => {
    console.log("on")
    if(chatId === id && notSeen > 0){
        removeUnread({sender: sender, receiver: chatId})
        setNotSeen(0)
    }
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
    socket.on("messageReceivedC", (data) => {
        console.log("i am receiver")
        if(id === data.sender){
            if(chatId !== id){
                setNotSeen(notSeen + 1)
            }
            setMessageLast(data.message.text)
            setLastSender(false)
        }
    })
    socket.on("messageUpdate", (data)=> {
        console.log("i am sender")
        console.log(id, data.receiver)
        if(data.receiver === id){
            console.log("entered")
            setMessageLast(data.message.text)
            setLastSender(true)
        }
    })
    return () => {
        console.log("off")
        socket.off("onlineStatus")
        socket.off("offlineStatus")
        socket.off("messageUpdate")
        socket.off("messageReceivedC")
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
                    <div className="flex space-x-1">
                        {messageLast !== "" && <span className={`${(notSeen === 0 || (notSeen > 0 && id === picked)) ? "font-semibold ": "font-bold "} text-gray-500`}>{lastSender ? "You: " : "Them: "}</span>}
                        {messageLast !== "" && <span className={`${(notSeen === 0 || (notSeen > 0 && id === picked)) ? "font-semibold text-gray-400": "font-bold text-gray-500"}`}>{messageLast}</span>}
                        {messageLast === "" && <span className="font-medium text-gray-400">{"Start a conversation."}</span>}
                    </div>
                </div>
            </div>
            {notSeen > 0 && <div className="rounded-full h-[35px] w-[35px] font-bold text-white bg-black flex items-center justify-center">{notSeen}</div>}
        </div>
    </Link>
  )
}

export default SidebarCard