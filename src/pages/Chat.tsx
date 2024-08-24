import Messenger from "../components/Messenger"
import Navbar from "../components/Navbar"
import SocketProvider from "../context/SocketProvider"

const Chat = () => {
  return (
    <div className="">
        <Navbar />
        <SocketProvider backend_url={import.meta.env.VITE_BACKEND_URL}><Messenger /></SocketProvider>
    </div>
  )
}

export default Chat