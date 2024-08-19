import { Avatar } from "@mui/material"
import { FaUserCircle } from "react-icons/fa"
import { IoIosAdd } from "react-icons/io";
import { addedOrNot, FriendRequest } from "../api/userApi";
import { useEffect } from "react";
import { SpinnerDotted } from "spinners-react";
const UserSearchCard = ({profile_pic, name, username, id}: {id: string, profile_pic?: string, name: string, username: string}) => {
  const {sendRequest, requestSending, requestSent} = FriendRequest()
  const {findFriendOrNot, findingFriendOrNot, foundFriendOrNot} = addedOrNot()
  useEffect(() => {
    findFriendOrNot(id)
  }, [requestSent])
  return (
    <div className="flex w-full items-center justify-between border p-1 rounded-md">
        <div className="flex items-center gap-3">
            {profile_pic && <Avatar sx = {{width: "50px", height: "50px" ,border: "3px solid gray"}} src = {profile_pic}/>}
            {!profile_pic && <FaUserCircle className = "z-10" size = {20}/>}
            <div>
                <p className="text-gray-500">{name}</p>
                <p className="text-gray-400">{username}</p>
            </div>

        </div>
        <div className="cursor-pointer hover:bg-red-500 flex items-center bg-red-400 text-white border-2 h-[30px] p-2 rounded-lg">
            {foundFriendOrNot?.message == false && <IoIosAdd size = {20}/>}
            {(findingFriendOrNot || requestSending) && <SpinnerDotted color= {"rgb(248 113 113)"} size = {20}/>}
            {foundFriendOrNot?.message == false && <span onClick={() => sendRequest({id})}>Add</span>}
            {foundFriendOrNot?.message && <span onClick={() => sendRequest({id})}>Added</span>}
        </div>
    </div>
  )
}

export default UserSearchCard