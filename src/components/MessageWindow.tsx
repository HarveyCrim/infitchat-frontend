import { useEffect, useRef, useState } from "react"
import { fetchConvo, messageReceivedInactive, sendMessage } from "../api/convoApi"
import {  useParams } from "react-router-dom"
import { getUserRequest } from "../api/userApi"
import { RiAttachment2 } from "react-icons/ri";
import { useSocketContext } from "../context/socketContext"
import Message from "./Message"
import { IoSendSharp } from "react-icons/io5"
import { MdEmojiEmotions } from "react-icons/md"
import { FaPlus } from "react-icons/fa";

const MessageWindow = () => {
  const socket = useSocketContext()!
  const [fetchedMessages, setFetchedMessages] = useState<any[] >([])
  const {chatId} = useParams()
  const {userData} = getUserRequest()
  const divRef = useRef<HTMLDivElement>(null)
  const {messageSent, sendClicked} = sendMessage()
  const [payload, setPayload] = useState<string>("")
  const setInitial = async () => {
    const data = await fetchConvo({sender: userData?._id, receiver: chatId!})
    setFetchedMessages(data?.messages)
  }
  useEffect(() => {
    if(chatId === "home" || !userData)
        return
    setInitial()
  }, [chatId, userData])

  useEffect(() => {
    socket.on("messageReceived", async (data) => {
        if(chatId !== data.sender){
            await messageReceivedInactive(data)
        }
        else{
            if(fetchedMessages?.length > 0)
                setFetchedMessages([...fetchedMessages, data.message])
            else
                setFetchedMessages([data.message])
        }
    })
    if(chatId == "home")
        return
    divRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end"
    })
    
    return () => {
        socket.off("messageReceived")
        console.log("OFF")
    }
  })

  useEffect(() => {
    if(payload?.length! > 0 && messageSent){
        console.log("sent", messageSent.message)
     if(fetchedMessages?.length > 0)
        setFetchedMessages([...fetchedMessages, messageSent?.message])
    else
        setFetchedMessages([messageSent?.message])
     setPayload("")
    }
  }, [messageSent])
  if(chatId === "home"){
    return (<div className="flex items-center justify-center h-[100%]">
        <h1 className="text-2xl text-gray-500">Select a friend to begin chat.</h1>
    </div>)
  }
  return (
    <div className="h-[100%] border-2 ">
        <div className="border h-[90%] scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-gray-100 overflow-y-scroll">
            {fetchedMessages && <div ref = {divRef} className="flex flex-col space-y-5 py-3 px-7">
                {
                    fetchedMessages.map((message: any, index: number) => {
                        let date = new Date(message.createdAt)
                        let time = date.toLocaleString("en-US",{weekday: "long", hour: "numeric", minute:"numeric"})
                        return <Message time = {time} key = {index} text = {message.text} sender = {message.sender} user = {userData._id}/>
                    })
                }
            </div>}
            
        </div>
        <div className="h-[10%] w-[100%] flex items-center justify-between px-10 space-x-3">
            <div className="w-[20%] flex w-fit space-x-2">
                <MdEmojiEmotions size = {30} className="hover:cursor-pointer hover:fill-gray-500"/>
                <RiAttachment2 size = {30} className="hover:cursor-pointer hover:fill-gray-500"/>
                <FaPlus size = {30} className="hover:cursor-pointer hover:fill-gray-500"/>
            </div>
            <input value = {payload!} onChange={(e) => setPayload(e.target.value)} type = "text" className="border-none outline-none h-full w-[80%] text-lg" placeholder="Enter a message..."/>
            <IoSendSharp size = {30} className="hover:cursor-pointer hover:fill-gray-500" onClick={() => sendClicked({sender: userData?._id, receiver: chatId!, 
                message : {
                    text: payload!,
                    sender: userData?._id
                }
            })}/>
        </div>
    </div>
  )
}

export default MessageWindow