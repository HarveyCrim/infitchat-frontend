import { createSlice } from "@reduxjs/toolkit";
type initial = {
    socket: any | null,
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
export const {setSocket} = userSlice.actions