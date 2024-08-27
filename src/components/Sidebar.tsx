import { SpinnerDotted } from "spinners-react"
import { getUserRequest } from "../api/userApi"
import Searchbox from "./Searchbox"
import SidebarCard from "./SidebarCard"
import { useEffect, useState } from "react"
const Sidebar = () => {
  const {userData, findingUser, refetch} = getUserRequest()
  const [filter, setTheFilter] = useState<string>("")
  const [filteredFriends, setFilteredFriends] = useState<any[] | null>(null)
  console.log(filteredFriends, "file")
  useEffect(() => {
    console.log("filter", filter)
    if(filter.length > 0 && userData){
        refetch().then(() => {
            let showFriends = userData?.friends.filter((friend: any) => {
                return friend.friendId.name.toLowerCase().includes(filter.toLowerCase())
            })
            setFilteredFriends(showFriends)
        }
    )
        
    }
  }, [filter, userData])
  return (
    <div className="h-[100%] overflow-y-hidden border-r border-gray-400">
        <div className="bg-gray-100 w-full flex justify-center items-center py-3">
            <div className="w-[75%]">
                <Searchbox setTheFilter = {setTheFilter}/>
            </div>
        </div>
        {findingUser && <div className="flex items-center justify-center h-full">
            {<SpinnerDotted color= {"rgb(248 113 113)"} size = {50}/>}
        </div>}
        {filter === "" && userData && <div className="h-full scrollbar-thin scrollbar-thumb-gray-500 overflow-y-scroll">
            {
                userData?.friends.map((item: any, index: number) => {
                    console.log(item)
                    return <SidebarCard sender = {userData?._id} isOnline = {item.friendId.isOnline} key = {item.friendId?._id} id = {item.friendId?._id} name={item.friendId.name} lastMessage={item.lastMessage ? item.lastMessage.text:""} lastMessageByYou = {item.lastMessage && item.lastMessage.sender.toString() === userData?._id.toString()} profile_pic={item.friendId.profile_pic} unread={item.unread.length}/>
                })
            }
        </div>}
        {filter !== "" && filteredFriends && <div className="h-full scrollbar-thin scrollbar-thumb-gray-500 overflow-y-scroll">
            {
                filteredFriends.map((item: any, index: number) => {
                    console.log(item)
                    return <SidebarCard sender = {userData?._id} isOnline = {item.friendId.isOnline} key = {item.friendId._id} id = {item.friendId?._id} name={item.friendId.name} lastMessage={item.lastMessage ? item.lastMessage.text:""} lastMessageByYou = {item.lastMessage && item.lastMessage.sender.toString() === userData?._id.toString()} profile_pic={item.friendId.profile_pic} unread={item.unread.length}/>
                })
            }
        </div>}
    </div>
  )
}

export default Sidebar