import { IoSearchSharp } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { useAuth0 } from "@auth0/auth0-react";
import Loaders from "./Loaders";


const Navbar = () => {
  const {isAuthenticated, logout, loginWithRedirect, isLoading} = useAuth0()

  if(isLoading){
    return <Loaders />
  }
  return (
    <div className="flex justify-between bg-red-400 w-[100%] p-4 shadow-lg">
        <h1 className="text-white text-3xl font-bold font-mono tracking-[-2px]">InfiChat</h1>
        <div className = "flex space-x-6 items-center">
            <IoSearchSharp size = {30} className="fill-white cursor-pointer"/>
            <IoIosAdd size = {30} className="fill-white cursor-pointer"/>
            <FaUser onClick = {() => {
                if(isAuthenticated){
                    //view profile
                }
                else{
                    loginWithRedirect()
                }
            }} size = {20} className="fill-white cursor-pointer"/>
            <IoIosNotifications size = {30} className="fill-white cursor-pointer"/>
            <IoIosLogOut onClick = {() => logout()} size = {30} className="fill-white cursor-pointer"/>
            <FaPeopleGroup size = {30} className="fill-white cursor-pointer"/>
        </div>
    </div>
  )
}

export default Navbar