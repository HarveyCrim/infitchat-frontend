import { useEffect, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { getUsername } from "../api/userApi";
import { SpinnerDotted } from "spinners-react";
import UserSearchCard from "./UserSearchCard";
import { switchAddFriendMenu } from "../redux/appStateSlice";
import { useDispatch } from "react-redux";
const AddMenu = () => {
  const [name, setName] = useState<string>("")
  const {data, fetchUser, fetchingUser} = getUsername()
  console.log(data)
  const menuRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const clicked = (e: Event) => {
    if(!menuRef.current?.contains(e.target as Node)){
        dispatch(switchAddFriendMenu(false))
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", clicked)

    return () => {
        document.removeEventListener("mousedown", clicked)
    }
  }, [])

  useEffect(() => {
    if(name === "")
        return
    const id = setTimeout(() => {
        fetchUser({email: name!})
    }, 2000)

    return () => {
        clearTimeout(id)
    }
  },[name])

  return (
    <div ref = {menuRef} className="absolute right-[70px] bg-white top-[70px] rounded-md border-gray-400 p-3 min-w-[400px] border shadow-lg">
        <div className="flex items-center gap-3 w-full">
            <IoSearchSharp size = {20}/>
            <input value = {name} onChange={(e) => setName(e.target.value)} className="outline-none border-none w-full text-lg" type = "text" placeholder="Enter a username..." />
        </div>
        <div className="min-h-[50px] flex items-center justify-center mt-[10px]"> 
            {(!data && !fetchingUser) && <h1 className="text-center">No Results.</h1>}
            {data && <UserSearchCard id = {data._id} profile_pic= {data.profile_pic ? data.profile_pic : null} name={data.name} username={data.email}/>}
            {fetchingUser && <SpinnerDotted color= {"rgb(248 113 113)"} size = {20}/>}
        </div>
    </div>
  )
}

export default AddMenu