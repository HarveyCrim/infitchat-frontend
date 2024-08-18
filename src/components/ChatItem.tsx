import { Avatar, AvatarGroup } from "@mui/material"
import { memo } from "react"
import { Link } from "react-router-dom"
type chatItemType = {
    avatar : string[],
    name: string,
    _id: string,
    group: boolean,
    sameSender: boolean,
    active : boolean,
    isOnline: boolean,
    newMessageAlert: number,
    index: number,
    handleDeleteChat?: () => void
}
const ChatItem = memo(({
    avatar = [],
    name,
    _id,
    group,
    active,
    sameSender,
    isOnline,
    newMessageAlert,
    index,
    handleDeleteChat
} : chatItemType) => {
    console.log(avatar, active, name, index, group, sameSender, _id, isOnline, newMessageAlert, handleDeleteChat)
  return (
    <Link to = {"/chat/"+_id}>
    <div className={`flex border-2 cursor-pointer ${!active && "hover:bg-gray-100"} pt-4 pl-4 pr-4 ${active && "bg-gray-400 hover:bg-gray-400"} pb-7 space-x-3 shadow-lg rounded-md`}>
         <div className="relative w-[40%]">
                <AvatarGroup sx={{position: "absolute", left: "0rem", top:"-4px"}} max={4}>
                    {
                        avatar.map((image, index) => {
                            return <Avatar src = {image} key = {index}/>
                        })
                    }
                </AvatarGroup>
            </div>
        <div className="flex justify-between w-[100%]">
            <p className="font-semibold self-center">{name}</p>
            {isOnline && <div className="bg-green-500 rounded-full w-[1rem] h-[1rem] self-center"></div>}
        </div>
    </div>
    </Link>
  )
})

export default ChatItem