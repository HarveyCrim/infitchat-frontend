import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useSelector } from "react-redux"
import { IRootState } from "../redux/store"
const backend_url = import.meta.env.VITE_BACKEND_URL

type message = {
    text: string,
    sender: string,
    imageUrl?: string,
    videoUrl?: string
}
type messageType = {
    sender: string,
    receiver: string,
    message: message
}
export const sendMessage = () => {
    const socket = useSelector<IRootState, any>(state => state.userReducer.socket)
    const {mutateAsync: sendClicked, isPending: messageSending, data: messageSent} = useMutation({
        mutationFn: async (data: messageType) => {
            const resp = await axios({
                method: "post",
                url: backend_url+"api/convo/create",
                data,
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("token") as string)
                }
            })
            return resp.data
        },
        onSuccess: (data) => {
            socket.emit("messageSent", data)
        }
    })
    return {sendClicked, messageSending, messageSent}
}

export const fetchConvo = async (data: {sender: string, receiver: string}) => {
    console.log("info", data)
    const resp = await axios({
        method: "post",
        url: backend_url+"api/convo/convo",
        data,
        headers: {
            Authorization: JSON.parse(localStorage.getItem("token") as string)
        }
    })
    console.log("datafetch", resp.data)
    return resp.data
}