import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {

    }
})

export type IRootState = ReturnType<typeof store.getState>