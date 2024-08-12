type chatItemType = {
    avatar : string[],
    name: string,
    _id: string,
    group: boolean,
    sameSender: boolean,
    isOnline: boolean,
    newMessageAlert: number,
    index: number,
    handleDeleteChat: () => void
}
const ChatItem = ({
    avatar = [],
    name,
    _id,
    group,
    sameSender,
    isOnline,
    newMessageAlert,
    index,
    handleDeleteChat
} : chatItemType) => {
    console.log(avatar, name, index, group, sameSender, _id, isOnline, newMessageAlert, handleDeleteChat)
  return (
    <div>ChatItem</div>
  )
}

export default ChatItem