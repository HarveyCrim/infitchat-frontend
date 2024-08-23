import { Avatar } from "@mui/material"
import { Link, useLocation } from "react-router-dom"

const SidebarCard = ({profile_pic, id, name, lastMessage, unread} : {id: string, profile_pic: string, name: string, lastMessage: string, unread?: number}) => {
  const location = useLocation()
  const picked = location.pathname.substring(6)
  return (
    <Link to = {`/chat/${id}`}>
        <div className={`flex hover:bg-gray-200 ${id === picked ? "bg-gray-200":""} items-center justify-between px-4 py-4 border`}>
            <div className="flex gap-2">
                <Avatar sx = {{width: "50px", height: "50px" ,border: "3px solid gray"}} src = {profile_pic}/>
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