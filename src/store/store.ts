import { configureStore } from "@reduxjs/toolkit";
import movieListsReducer from "./slices/movieSlice"

const store = configureStore({
    reducer: {
        movieLists: movieListsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store