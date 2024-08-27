import { IoSearchSharp } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";
const Searchbox = (props: {setTheFilter : React.Dispatch<React.SetStateAction<string>>}) => {
  const [searchName, setSearchName] = useState<string>()
  return (
    <div className="flex items-center border-2 bg-white px-3 gap-2 rounded-xl p-2 justify-between">  
        <div className="flex gap-2 items-center">
            <IoSearchSharp size = {25} className="fill-gray-400"/>
            <input value = {searchName} onChange = {(e) => {setSearchName(e.target.value); props.setTheFilter(e.target.value)}} type = "text" className="outline-none min-w-[230px]" placeholder="search for friends..."/>
        </div>
        <IoIosClose className = "cursor-pointer" onClick = {() => setSearchName("")} size = {30}/>
    </div>
  )
}

export default Searchbox