import { Avatar } from "@mui/material"
import { friendRequestHandler } from "../api/userApi"

const Notification = ({profile_pic, type, email, number, id} : {profile_pic:string, type:string, email:string, number?: number, id: string}) => {
  const {handleFriendRequest} = friendRequestHandler()
  return (
    <div className="flex flex-col border border-slate-300 p-2 shadow-md bg-gray-100">
        <div className="flex items-center gap-2 ">
            <Avatar sx = {{width: "50px", height: "50px" ,border: "3px solid gray"}} src = {profile_pic}/>
            {type == "request" && (email +" sent you a friend request.")}
             {type !== "request" && ("You have "+number+" new messages from "+email+".")}
        </div>
        {type == "request" && <div className="flex w-full justify-center gap-2">
                <button onClick = {() => handleFriendRequest({decision: "accept", sender: id})} className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600">Accept</button>
                <button onClick = {() => handleFriendRequest({decision: "reject", sender: id})} className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600">Reject</button>
            </div>}
    </div>
  )
}

export default Notification