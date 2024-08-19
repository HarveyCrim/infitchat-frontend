import { getUserRequest } from "../api/userApi"
import Searchbox from "./Searchbox"

const Sidebar = () => {
  const {userData, findingUser} = getUserRequest()
  return (
    <div className="border h-[100%]">
        <div className="bg-gray-100 w-full flex justify-center items-center py-3">
            <div className="w-[80%]">
                <Searchbox />
            </div>
        </div>
    </div>
  )
}

export default Sidebar