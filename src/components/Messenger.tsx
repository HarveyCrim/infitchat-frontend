import MessageWindow from "./MessageWindow"
import Sidebar from "./Sidebar"

const Messenger = () => {
  return (
    <div className="flex max-h-[calc(100vh-80px)]">
        <div className="w-[35%]"> 
            <Sidebar />
        </div>
        <div className="w-[65%]">
            <MessageWindow />
        </div>
    </div>
  )
}

export default Messenger