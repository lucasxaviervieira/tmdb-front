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

interface MoviesList {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

interface MoviesListsState {
    popularMovies: MoviesList;
    topRatedMovies: MoviesList;
    loading: boolean;
    error: string | null
}

const moviesListInitialState = { page: 0, results: [], total_pages: 0, total_results: 0 }

const initialState: MoviesListsState = {
    popularMovies: moviesListInitialState,
    topRatedMovies: moviesListInitialState,
    loading: false,
    error: null
}

export const fetchPopularMovies = createAsyncThunk("movies/fetchPopularMovies", async () => {
    const response = await api.get("/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc")
    return response.data
})

export const fetchTopRatedMovies = createAsyncThunk("movies/fetchTopRatedMovies", async () => {
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
            .addMatcher(
                isFulfilled(fetchPopularMovies, fetchTopRatedMovies),
                (state, action) => {
                    state.loading = false;
                    if (action.type === fetchPopularMovies.fulfilled.type) {
                        state.popularMovies = action.payload;
                    } else if (action.type === fetchTopRatedMovies.fulfilled.type) {
                        state.topRatedMovies = action.payload;
                    }
                }
            )
            .addMatcher(
                isPending(fetchPopularMovies, fetchTopRatedMovies),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                isRejected(fetchPopularMovies, fetchTopRatedMovies),
                (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || "Failed to fetch movies";
                }
            )
    }
});

export default movieListsSlice.reducer;