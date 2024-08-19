import { SpinnerDotted } from "spinners-react"
import { getUserRequest } from "../api/userApi"
import Notification from "./Notification"
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { switchNotificationMenu } from "../redux/appStateSlice"

const NotificationMenu = () => {
 const {userData, findingUser} = getUserRequest()
 const dispatch = useDispatch()
 const menuRef = useRef<HTMLDivElement>(null)
 const clicked = (e: Event) => {
    if(!menuRef.current?.contains(e.target as Node)){
        dispatch(switchNotificationMenu(false))
    }
 }
 useEffect(() => {
    document.addEventListener("mousedown", clicked)

    return() => {
        document.removeEventListener("mousedown", clicked)
    }
 }, [])

 if(findingUser){
    return <SpinnerDotted color= {"rgb(248 113 113)"} size = {20}/>
 }
  return (
    <div ref = {menuRef} className="overflow-y-scroll border-2 bg-white absolute top-[70px] right-[50px] w-[500px] h-[300px] rounded-md p-2">
        {
            userData?.notifications.map((item: any, index: number) => {
                return <Notification key = {index} profile_pic={item.from.profile_pic} id = {item.from._id} email={item.from.email} type = {item.kind}/>
            })
        }
        {(userData?.notifications == null || userData?.notifications.length == 0)
            && <div className="flex justify-center items-center h-full"><h1 className="font-bold">No Notifications.</h1></div>
        }
    </div>
  )
}

export default NotificationMenu