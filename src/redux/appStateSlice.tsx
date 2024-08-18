import { createSlice } from "@reduxjs/toolkit";
type initialType = {
    searchOn : boolean
}

const initialState: initialType = {
    searchOn: false
}
const appStateSlice = createSlice({
    name: "appStateReducer",
    initialState,
    reducers: {
        switchSearch: (state, action) => {
            state.searchOn = action.payload
        }
    }
})

export default appStateSlice.reducer
export const {switchSearch} = appStateSlice.actions