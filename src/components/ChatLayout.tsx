import ChatList from "./ChatList"
import ChatWindow from "./ChatWindow"

const ChatLayout = () => {
  return (
    <div className="flex">
        <ChatList />
        <ChatWindow />
    </div>
  )
}

export default ChatLayout