import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
const backend_url = import.meta.env.VITE_BACKEND_URL

type user = {
    name: string,
    email: string,
    profile_pic?: string
}

export const getUserRequest = () => {
    const {data: userData, isPending: findingUser} = useQuery({
        queryKey: ["getUser"],
        queryFn: async () => {
            const token = JSON.parse(localStorage.getItem("token") as string)
            const resp = await axios({
                url: backend_url+"api/user/current",
                headers: {
                    Authorization: token
                }
            })
            return resp.data
        }
    })
    return {userData, findingUser}
}

export const updateUserRequest = () => {
    const client = useQueryClient()
    const {data: moddedData, mutateAsync: updateFn, isPending: isUpdating} = useMutation({
        mutationFn: async ({profile_pic} : {profile_pic: string}) => {
            const resp = await axios({
                method: "put",
                data: {profile_pic},
                url: backend_url+"api/user/update",
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
    const {data: userData, mutateAsync: createUserFn, isPending: creatingUser} = useMutation({
        mutationFn: async (userInfo: user) => {
            const resp = await axios({
                method: "post",
                url: backend_url+"api/user/create",
                data: userInfo
            })
            return resp.data
        },
        onSuccess: (data) => {
            localStorage.setItem("token", JSON.stringify(data.token))
        }
    })
    return {userData, createUserFn, creatingUser}
}
