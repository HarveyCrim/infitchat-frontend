import { IoIosAdd } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { useAuth0 } from "@auth0/auth0-react";
import Loaders from "./Loaders";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { switchAddFriendMenu, switchNotificationMenu } from "../redux/appStateSlice";
import { Link } from "react-router-dom";


const Navbar = () => {
  const {isAuthenticated, logout, loginWithRedirect, isLoading} = useAuth0()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  if(isLoading){
    return <Loaders />
  }
  return (
    <div className="flex justify-between bg-red-400 shadow-lg items-center px-4 h-[85px]">
       <Link to = {"/"}> <h1 className="cursor-pointer text-white text-3xl font-bold font-mono tracking-[-2px]">InfiChat</h1></Link>
        {isAuthenticated && <div className = "flex space-x-6 items-center">
             <IoIosAdd onClick={() => dispatch(switchAddFriendMenu(true))} size = {30} className="fill-white cursor-pointer"/>
            <FaUser onClick = {() => {
                if(isAuthenticated){
                    navigate("/profile")
                }
                else{
                    loginWithRedirect()
                }
            }} size = {20} className="fill-white cursor-pointer"/>
            <IoIosNotifications onClick = {() => dispatch(switchNotificationMenu(true))} size = {30} className="fill-white cursor-pointer"/>
            <IoIosLogOut onClick = {() => {
                localStorage.removeItem("token")
                logout()}} size = {30} className="fill-white cursor-pointer"/>
            <FaPeopleGroup size = {30} className="fill-white cursor-pointer"/>
        </div>}
        {!isAuthenticated && <button onClick = {() => {
            
            loginWithRedirect()
            }} className="bg-red-400 border-2 rounded-xl text-white text-lg px-3 hover:text-black hover:border-black py-1 shadow-lg border-white">Sign in</button>}
    </div>
  )
}

export default Navbar