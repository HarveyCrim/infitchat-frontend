import { configureStore } from "@reduxjs/toolkit";
import appStateReducer from "./appStateSlice";
import userReducer from "./userSlice"
export const store = configureStore({
    reducer: {
        appStateReducer: appStateReducer,
        userReducer: userReducer
    }
})

export type IRootState = ReturnType<typeof store.getState>