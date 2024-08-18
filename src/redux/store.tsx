import { configureStore } from "@reduxjs/toolkit";
import appStateReducer from "./appStateSlice";
export const store = configureStore({
    reducer: {
        appStateReducer: appStateReducer
    }
})

export type IRootState = ReturnType<typeof store.getState>