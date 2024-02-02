
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi, postApi, putApi, deleteApi } from "../../utilities/fetchApi";

const uri = process.env.REACT_APP_SERVER_URI;
const port = process.env.REACT_APP_PORT;

export const loadCartData = createAsyncThunk(
    'cart/loadCartData',
    async(params) => {    
        const serverUrl = `http://${uri}:${port}/cart/${params}`;
        
        return await getApi(serverUrl);
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

        const serverUrl = `http://${uri}:${port}/cart/${cartId}`;

        return await postApi(serverUrl, itemData);
    }
)

export const editCartItem = createAsyncThunk(
    'cart/editCartItem',
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

        const serverUrl = `http://${uri}:${port}/cart/${cartId}`;

        return await putApi(serverUrl, itemData);
    }
)

export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async(params) => {
        const {
            cartId,
            productId
        } = params;

        const serverUrl = `http://${uri}:${port}/cart/${cartId}?product_id=${productId}`;

        return await deleteApi(serverUrl);
    }
)

export const checkoutCart = createAsyncThunk(
    'cart/checkoutCart',
    async(params) => {
        const {
            cartId,
            checkoutInfo
        } = params;

        const serverUrl = `http://${uri}:${port}/cart/${cartId}/checkout`;

        return await postApi(serverUrl, checkoutInfo);
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [
            {id: 1, name: 'bag', price: 13.59, qty: 12, isHovering: false},
            {id: 2, name: 'tool', price: 19.99, qty: 1, isHovering: false},
            {id: 3, name: 'watch', price: 27.63, qty: 3, isHovering: false},
        ],
        qty: 2,
        totalPrice: 5.99,
        isLoading: false,
        isError: false,
        error: null
    },
    reducers: {
        setIsHovering(state, action) {
            const productIndex = state.cart.findIndex((item) => item.id === action.payload.productId);
            state.cart[productIndex].isHovering = action.payload.isHovering;
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
            data.forEach(item => item.isHovering = false);
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
            data.forEach(item => item.isHovering = false);
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
        .addCase(editCartItem.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(editCartItem.fulfilled, (state, action) => {
            const data = action.payload;
            data.forEach(item => item.isHovering = false);
            state.isLoading = false;
            state.isError = false;
            state.cart = data;
            state.qty = data.map(item => item.qty).reduce((acc, val) => acc + val);
            state.totalPrice = data.map(item => item.price * item.qty).reduce((acc, val) => acc + val);
        })
        .addCase(editCartItem.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
        .addCase(deleteCartItem.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(deleteCartItem.fulfilled, (state, action) => {
            const data = action.payload;
            data.forEach(item => item.isHovering = false);
            state.isLoading = false;
            state.isError = false;
            state.cart = data;
            state.qty = data.map(item => item.qty).reduce((acc, val) => acc + val);
            state.totalPrice = data.map(item => item.price * item.qty).reduce((acc, val) => acc + val);
        })
        .addCase(deleteCartItem.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
        .addCase(checkoutCart.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(checkoutCart.fulfilled, (state, action) => {
            const data = action.payload;
            data.forEach(item => item.isHovering = false);
            state.isLoading = false;
            state.isError = false;
            state.cart = data;
            state.qty = data.map(item => item.qty).reduce((acc, val) => acc + val);
            state.totalPrice = data.map(item => item.price * item.qty).reduce((acc, val) => acc + val);
        })
        .addCase(checkoutCart.rejected, (state, action) => {
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
export const { setIsHovering } = cartSlice.actions;
export default cartSlice.reducer;