
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadHomeData = createAsyncThunk(
    'home/loadHomeData',
    async(params) => {       
        const uri = process.env.SERVER_URI;
        const port = process.env.PORT;
        const serverUrl = `http://${uri}:${port}/`;
        
        const response = await fetch(serverUrl);
        if(!response.ok) {
            const error = await response.json()
            const message = `An error has occured: ${response.status} ${error.message}`;
            throw new Error(message);
        }
        const data = await response.json();
        return data;
    }
)

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        home: {},
        isLoading: false,
        isError: false,
        error: null
    },
    reducers: {
        incrementCount(state) {
            state.count += 25
        },
        decrementCount(state) {
            state.count -= 25
        },
        resetCount(state) {
            state.count = 0;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadHomeData.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadHomeData.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.home = data;
        })
        .addCase(loadHomeData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export const selectHome = (state) => state.home.home;
export const selectIsLoading = (state) => state.home.isLoading;
export const selectIsError = (state) => state.home.isError;
export const selectError = (state) => state.home.error;
// export const { incrementCount, decrementCount, resetCount } = homeSlice.actions;
export default homeSlice.reducer;