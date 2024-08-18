import { IoSearchSharp } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { useAuth0 } from "@auth0/auth0-react";
import Loaders from "./Loaders";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { switchSearch } from "../redux/appStateSlice";
import Searchbox from "./Searchbox";


const Navbar = () => {
  const {isAuthenticated, logout, loginWithRedirect, isLoading} = useAuth0()
  const searchOn = useSelector<IRootState, boolean>(state => state.appStateReducer.searchOn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  if(isLoading){
    return <Loaders />
  }
  return (
    <div className="flex justify-between bg-red-400 w-[100%] h-[90px] shadow-lg items-center px-4">
        <h1 className="text-white text-3xl font-bold font-mono tracking-[-2px]">InfiChat</h1>
        {isAuthenticated && <div className = "flex space-x-6 items-center">
            {!searchOn && <IoSearchSharp onClick = {() => dispatch(switchSearch(true))} size = {30} className="fill-white cursor-pointer"/>}
            {searchOn && <Searchbox />}
            <IoIosAdd size = {30} className="fill-white cursor-pointer"/>
            <FaUser onClick = {() => {
                if(isAuthenticated){
                    navigate("/profile")
                }
                else{
                    loginWithRedirect()
                }
            }} size = {20} className="fill-white cursor-pointer"/>
            <IoIosNotifications size = {30} className="fill-white cursor-pointer"/>
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