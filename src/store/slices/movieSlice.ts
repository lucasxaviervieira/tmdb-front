import { createSlice, createAsyncThunk, isPending, isRejected, isFulfilled } from "@reduxjs/toolkit";
import api from "../../api/api"

export interface Movie {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: Date
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

interface MoviesListsState {
    popularMovies: Movie[];
    topRatedMovies: Movie[];
    loading: boolean;
    error: string | null
}

const initialState: MoviesListsState = {
    popularMovies: [],
    topRatedMovies: [],
    loading: false,
    error: null
}

export const fetchPopularMovies = createAsyncThunk("movies/fetchMovies", async () => {
    const response = await api.get("/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc")
    return response.data
})

export const fetchTopRatedMovies = createAsyncThunk("movies/fetchMovies", async () => {
    const response = await api.get("/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200")
    return response.data
})

// # create an 'utils' package and a file to get the start and end date of the current month, for this GET

// export const fetchUpcomingMovies = createAsyncThunk("movies/fetchMovies", async () => {
//     const response = await api.get("discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}")
//     return response.data
// })

const movieListsSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(fetchPopularMovies.fulfilled, (state, action) => {
            //     state.loading = false
            //     state.popularMovies = action.payload;
            // })
            // .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
            //     state.loading = false
            //     state.topRatedMovies = action.payload;
            // })
            .addMatcher(
                isFulfilled(fetchPopularMovies, fetchTopRatedMovies),
                (state, action) => {
                    state.loading = false
                    state.popularMovies = action.payload;
                    state.topRatedMovies = action.payload;
                }
            )
            .addMatcher(
                isPending(fetchPopularMovies, fetchTopRatedMovies),
                (state) => {
                    state.loading = true
                }
            )
            .addMatcher(
                isRejected(fetchPopularMovies, fetchTopRatedMovies),
                (state, action) => {
                    state.loading = true;
                    state.error = action.error.message || "Failed to fetch posts";
                }
            )
    }
})

export default movieListsSlice.reducer;