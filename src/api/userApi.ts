import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useSocketContext } from "../context/socketContext"
const backend_url = import.meta.env.VITE_BACKEND_URL

type user = {
    name: string,
    email: string,
    profile_pic?: string
}

export const getUserRequest = () => {
    const {data: userData, isPending: findingUser, refetch} = useQuery({
        queryKey: ["getUser"],
        queryFn: async () => {
            const token = JSON.parse(localStorage.getItem("token") as string)
            if(!token)
                return null
            const resp = await axios({
                url: backend_url+"/api/user/current",
                headers: {
                    Authorization: token
                }
            })
            return resp.data
        }
    })
    return {userData, findingUser, refetch}
}

export const friendRequestHandler = () => {
    const socket = useSocketContext()!
    const client = useQueryClient()
    const {mutateAsync: handleFriendRequest, isPending: handlingFriendRequest, data: FriendRequestResponse} = useMutation({
        mutationFn: async (info:{sender: string, decision: string}) => {
            const resp = await axios({
                method: "post",
                url: backend_url+"/api/user/friend-request/respond",
                data: info,
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("token") as string)
                }
            })
            return resp.data
        },
        onSuccess : (data) => {
            if(data.message == "accepted"){
                socket.emit("friendRequestAccepted", data)
            }
            client.invalidateQueries({queryKey: ["getUser"]})
        }
    })
    return {handleFriendRequest, handlingFriendRequest, FriendRequestResponse}
}

export const FriendRequest = () => {
    const socket = useSocketContext()!
    const {mutateAsync: sendRequest, data: requestSent, isPending: requestSending} = useMutation({
        mutationFn: async ({id, sender} : {id: string, sender: string}) => {
            const resp = await axios({
                method: "get",
                url: backend_url+"/api/user/sendRequest/"+id+"/"+sender,
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("token") as string)
                }
            })
            return resp.data
        },
        onSuccess(data) {
            if(data.message == "added"){
                socket.emit("notificationSent", {to: data.to, type: "request", action: "increase"})
            }
            else if(data.message == "removed"){
                socket.emit("notificationSent", {to: data.to, type: "request", action: "decrease"})
            }
        },
    })
    return {sendRequest, requestSending, requestSent}
}

export const addedOrNot = () => {
    const {mutateAsync: findFriendOrNot, isPending: findingFriendOrNot, data: foundFriendOrNot} = useMutation({
        mutationFn: async (_id: string) => {
            const resp = await axios({
                method: "get",
                url: backend_url+"/api/user/friendOrNot/"+_id,
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("token") as string)
                }
            })
            return resp.data
        }
    })
    return {findFriendOrNot, findingFriendOrNot, foundFriendOrNot}
}

export const getUsername = () => {
    const {data, isPending: fetchingUser, mutateAsync: fetchUser} = useMutation({
        mutationFn: async ({email}: {email: string}) => {
            const resp = await axios({
                method: "get",
                url:backend_url+"/api/user/specific/"+email,
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("token") as string)
                }
            })
            return resp.data
        }
    })
    return {fetchUser, fetchingUser, data}
}

export const updateUserRequest = () => {
    const client = useQueryClient()
    const {data: moddedData, mutateAsync: updateFn, isPending: isUpdating} = useMutation({
        mutationFn: async ({profile_pic} : {profile_pic: string}) => {
            const resp = await axios({
                method: "put",
                data: {profile_pic},
                url: backend_url+"/api/user/update",
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("token") as string)
                }
            })
            return resp.data
        },
        onSuccess: () => {
            client.invalidateQueries({queryKey: ["getUser"]})
        }
    })

    return {moddedData, updateFn, isUpdating}
}

export const createUserRequest = () => {
    console.log(backend_url+"/api/user/create",)
    const {data: userData, mutateAsync: createUserFn, isPending: creatingUser} = useMutation({
        mutationFn: async (userInfo: user) => {
            console.log("create")
            const resp = await axios({
                method: "post",
                url: backend_url+"/api/user/create",
                data: userInfo
            })
            return resp.data
        },
        onSuccess: (data) => {
            console.log("set")
            localStorage.setItem("token", JSON.stringify(data.token))
            
        }
    })
    return {userData, createUserFn, creatingUser}
}
