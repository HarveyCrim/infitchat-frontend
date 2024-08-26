import { SpinnerDotted } from "spinners-react"
import { getUserRequest } from "../api/userApi"
import Searchbox from "./Searchbox"
import SidebarCard from "./SidebarCard"
const Sidebar = () => {
  const {userData, findingUser} = getUserRequest()
  return (
    <div className="h-[100%] overflow-y-hidden border-r border-gray-400">
        <div className="bg-gray-100 w-full flex justify-center items-center py-3">
            <div className="w-[75%]">
                <Searchbox />
            </div>
        </div>
        {findingUser && <div className="flex items-center justify-center h-full">
            {<SpinnerDotted color= {"rgb(248 113 113)"} size = {50}/>}
        </div>}
        {userData && <div className="h-full scrollbar-thin scrollbar-thumb-gray-500 overflow-y-scroll">
            {
                userData?.friends.map((item: any, index: number) => {
                    console.log(item)
                    return <SidebarCard sender = {userData?._id} isOnline = {item.friendId.isOnline} key = {index} id = {item.friendId?._id} name={item.friendId.name} lastMessage={item.lastMessage ? item.lastMessage.text:""} lastMessageByYou = {item.lastMessage && item.lastMessage.sender.toString() === userData?._id.toString()} profile_pic={item.friendId.profile_pic} unread={item.unread.length}/>
                })
            }
        </div>}
    </div>
  )
}

export default Sidebar