import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
type initial = {
    socket: Socket | null,
}

const initialState: initial = {
    socket:null,

}

const userSlice = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        setSocket : (state, action) => {
            state.socket = action.payload
        },
    }
})

export default userSlice.reducer
export const {setSocket,} = userSlice.actions