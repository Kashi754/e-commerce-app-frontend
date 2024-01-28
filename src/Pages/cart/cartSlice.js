
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCartData = createAsyncThunk(
    'cart/loadCartData',
    async(params) => {       
        const uri = process.env.REACT_APP_SERVER_URI;
        const port = process.env.REACT_APP_PORT;
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
        qty: 2,
        totalPrice: 5.99,
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
            state.qty = data.map(item => item.qty).reduce((acc, val) => acc + val);
            state.totalPrice = data.map(item => item.price * item.qty).reduce((acc, val) => acc + val);
        })
        .addCase(loadCartData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export const selectCart = (state) => state.cart.cart;
export const selectQty = (state) => state.cart.qty;
export const selectPrice = (state) => state.cart.totalPrice;
export const selectIsLoading = (state) => state.cart.isLoading;
export const selectIsError = (state) => state.cart.isError;
export const selectError = (state) => state.cart.error;
// export const { incrementCount, decrementCount, resetCount } = homeSlice.actions;
export default cartSlice.reducer;