import { IoSearchSharp } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";
const Searchbox = () => {
  const [searchName, setSearchName] = useState<string>()
  return (
    <div className="flex animate-in fade-in duration-500 items-center border-2 bg-white px-1 gap-2 rounded-xl p-2">
        <IoSearchSharp size = {25} className="fill-gray-400"/>
        <div className="flex gap-2 items-center">
            <input value = {searchName} onChange = {(e) => setSearchName(e.target.value)} type = "text" className="outline-none min-w-[230px]" placeholder="search for friends..."/>
            <IoIosClose className = "cursor-pointer" onClick = {() => setSearchName("")} size = {30}/>
        </div>
    </div>
  )
}

export default Searchbox