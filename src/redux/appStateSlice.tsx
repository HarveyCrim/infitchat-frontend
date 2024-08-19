import { createSlice } from "@reduxjs/toolkit";
type initialType = {
    searchOn : boolean,
    addFriendMenu: boolean,
    notificationMenu: boolean
}

const initialState: initialType = {
    searchOn: false,
    addFriendMenu: false,
    notificationMenu: false
}
const appStateSlice = createSlice({
    name: "appStateReducer",
    initialState,
    reducers: {
        switchSearch: (state, action) => {
            state.searchOn = action.payload
        },
        switchAddFriendMenu : (state, action) => {
            state.addFriendMenu = action.payload
        },
        switchNotificationMenu: (state, action) => {
            state.notificationMenu = action.payload
        }
    }
})

export default appStateSlice.reducer
export const {switchSearch, switchAddFriendMenu, switchNotificationMenu} = appStateSlice.actions