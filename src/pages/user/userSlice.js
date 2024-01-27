
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadUserData = createAsyncThunk(
    'user/loadUserData',
    async(params) => {       
        const uri = process.env.SERVER_URL;
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

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
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
        .addCase(loadUserData.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadUserData.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.user = data;
        })
        .addCase(loadUserData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export const selectUser = (state) => state.user.user;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectIsError = (state) => state.user.isError;
export const selectError = (state) => state.user.error;
// export const { incrementCount, decrementCount, resetCount } = homeSlice.actions;
export default userSlice.reducer;