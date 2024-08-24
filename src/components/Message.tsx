const Message = ({text, time, sender, user}: {text: string, time: string, sender: string, user: string}) => {
  return (
    <div className={`${sender === user ? "self-start" : "self-end"} p-3 w-fit flex flex-col space-y-1 max-w-[400px]`}>
    <div className = {`${sender === user ? "bg-black text-white" : "bg-white text-black border-gray-200 self-end"} p-3 w-fit rounded-xl shadow-md`}>
        <p className="text-lg">{text}</p>
    </div>
    <span className="text-xs ">{time}</span>
    </div>
  )
}

export default Message