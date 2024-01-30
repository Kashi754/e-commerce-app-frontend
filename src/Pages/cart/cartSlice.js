
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCartData = createAsyncThunk(
    'cart/loadCartData',
    async(params) => {    
        const uri = process.env.REACT_APP_SERVER_URI;
        const port = process.env.REACT_APP_PORT;
        const serverUrl = `http://${uri}:${port}/cart/${params}`;
        
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

export const addCartItem = createAsyncThunk(
    'cart/addCartItem',
    async(params) => {
        const {
            cartId,
            productId,
            qty,
        } = params;

        const itemData = {
            productId,
            qty
        };

        const uri = process.env.REACT_APP_SERVER_URI;
        const port = process.env.REACT_APP_PORT;
        const serverUrl = `http://${uri}:${port}/cart/${cartId}`;

        try {
            const response = await fetch(serverUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemData)
            })

            if(!response.ok) {
                const error = await response.json()
                const message = `STATUS ${response.status}\nAn error has occured: ${error.message}`;
                throw new Error(message);
            }
            const data = await response.json();
            return data;
        } catch(err) {
            err.message=`STATUS 500\nAn error has occured: ${err.message}`
            throw err;
        }


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
        .addCase(addCartItem.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(addCartItem.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.cart = data;
            state.qty = data.map(item => item.qty).reduce((acc, val) => acc + val);
            state.totalPrice = data.map(item => item.price * item.qty).reduce((acc, val) => acc + val);
        })
        .addCase(addCartItem.rejected, (state, action) => {
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