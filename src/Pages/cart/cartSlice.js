
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCartData = createAsyncThunk(
    'cart/loadCartData',
    async(params) => {       
        const uri = process.env.SERVER_URI;
        const port = process.env.PORT;
        const serverUrl = `http://${uri}:${port}/cart/${params}`;
        
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

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: {},
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
        .addCase(loadCartData.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadCartData.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.cart = data;
        })
        .addCase(loadCartData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export const selectCart = (state) => state.cart.cart;
export const selectIsLoading = (state) => state.cart.isLoading;
export const selectIsError = (state) => state.cart.isError;
export const selectError = (state) => state.cart.error;
// export const { incrementCount, decrementCount, resetCount } = homeSlice.actions;
export default cartSlice.reducer;