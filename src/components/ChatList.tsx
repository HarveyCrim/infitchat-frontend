type newMessage = {
    chatId: string,
    count: number
}
type chatListType = {
    chats: string[],
    chatId: string,
    onlineUsers: string[],
    newMessages: newMessage[],
    handleDeleteChat? : () => void
}
const ChatList = ({chats = [], chatId, onlineUsers = [], newMessages = [{
    chatId: "",
    count: 3
}]} : chatListType) => {
    console.log(chats, chatId, onlineUsers, newMessages)
  return (
    <div className="w-[35%]">ChatList</div>
  )
}

export default ChatList