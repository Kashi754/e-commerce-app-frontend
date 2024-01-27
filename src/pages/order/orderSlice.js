
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadOrderData = createAsyncThunk(
    'order/loadOrderData',
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

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: {},
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
        .addCase(loadOrderData.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadOrderData.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.order = data;
        })
        .addCase(loadOrderData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export const selectOrder = (state) => state.order.order;
export const selectIsLoading = (state) => state.order.isLoading;
export const selectIsError = (state) => state.order.isError;
export const selectError = (state) => state.order.error;
// export const { incrementCount, decrementCount, resetCount } = homeSlice.actions;
export default orderSlice.reducer;