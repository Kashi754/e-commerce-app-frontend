
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadProductCategories = createAsyncThunk(
    'home/loadProductCategories',
    async() => {       
        const uri = process.env.REACT_APP_SERVER_URI;
        const port = process.env.REACT_APP_PORT;
        const serverUrl = `http://${uri}:${port}/categories`;
        
        try {
            const response = await fetch(serverUrl);
            if(!response.ok) {
                const error = await response.json()
                const message = `STATUS ${response.status}\nAn error has occured: ${error.message}`;
                throw new Error(message);
            }
            const data = await response.json();
            return data;
        } catch (err){
            err.message=`STATUS 500\nAn error has occured: ${err.message}`
            throw err;
        }
    }
)

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        categories: [
            {id: 1, name: 'electronics'},
            {id: 2, name: 'toiletries'},
            {id: 3, name: 'tools'},
            {id: 4, name: 'outdoor'},
        ],
        isLoading: false,
        isError: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadProductCategories.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadProductCategories.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.categories = data;
        })
        .addCase(loadProductCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export const selectCategories = (state) => state.home.categories;
export const selectIsLoading = (state) => state.home.isLoading;
export const selectIsError = (state) => state.home.isError;
export const selectError = (state) => state.home.error;
// export const { incrementCount, decrementCount, resetCount } = homeSlice.actions;
export default homeSlice.reducer;