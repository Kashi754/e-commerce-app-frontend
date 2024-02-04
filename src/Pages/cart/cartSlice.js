
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi, postApi, putApi, deleteApi } from "../../utilities/fetchApi";

const uri = process.env.REACT_APP_SERVER_URI;
const port = process.env.REACT_APP_PORT;

const initialState = {
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
};

export const loadCartData = createAsyncThunk(
    'cart/loadCartData',
    async() => {    
        const serverUrl = `http://${uri}:${port}/cart/`;
        
        return await getApi(serverUrl);
    }
)

export const addCartItem = createAsyncThunk(
    'cart/addCartItem',
    async(params) => {
        const {
            productId,
            qty,
        } = params;

        const itemData = {
            productId,
            qty
        };

        const serverUrl = `http://${uri}:${port}/cart/`;

        return await postApi(serverUrl, itemData);
    }
)

export const editCartItem = createAsyncThunk(
    'cart/editCartItem',
    async(params) => {
        const {
            productId,
            qty,
        } = params;

        const itemData = {
            productId,
            qty
        };

        const serverUrl = `http://${uri}:${port}/cart/`;

        return await putApi(serverUrl, itemData);
    }
)

export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async(params) => {
        const {
            productId
        } = params;

        const serverUrl = `http://${uri}:${port}/cart/?product_id=${productId}`;

        return await deleteApi(serverUrl);
    }
)

// export const checkoutCart = createAsyncThunk(
//     'cart/checkoutCart',
//     async(params) => {
//         const {
//             checkoutInfo
//         } = params;

//         const serverUrl = `http://${uri}:${port}/cart/${cartId}/checkout`;

//         return await postApi(serverUrl, checkoutInfo);
//     }
// )

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        qty: 0,
        totalPrice: 0,
        isLoading: false,
        isError: false,
        error: {}
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
            state.error = null;
        })
        .addCase(loadCartData.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = null;
            if(data.products.length > 0) {
                data.products.forEach(item => item.isHovering = false);
                state.qty = data.products.map(item => item.qty).reduce((acc, val) => acc + val);
            } else {
                state.qty = 0;
            }
            state.cart = data.products;
            state.totalPrice = data.total;
        })
        .addCase(loadCartData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error;
        })
        .addCase(addCartItem.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        })
        .addCase(addCartItem.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = null;
            data.products.forEach(item => item.isHovering = false);
            state.cart = data.products;
            state.qty = data.products.map(item => item.qty).reduce((acc, val) => acc + val);
            state.totalPrice = data.total;
        })
        .addCase(addCartItem.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error;
        })
        .addCase(editCartItem.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        })
        .addCase(editCartItem.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = null;
            data.products.forEach(item => item.isHovering = false);
            state.cart = data.products;
            state.qty = data.products.map(item => item.qty).reduce((acc, val) => acc + val);
            state.totalPrice = data.total;
        })
        .addCase(editCartItem.rejected, (state, action) => {
            console.log(action.error);
            state.isLoading = false;
            state.isError = true;
            state.error = action.error;
        })
        .addCase(deleteCartItem.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        })
        .addCase(deleteCartItem.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = null;
            if(data.products.length > 0) {
                data.products.forEach(item => item.isHovering = false);
                state.qty = data.products.map(item => item.qty).reduce((acc, val) => acc + val);
            } else {
                state.qty = 0;
            }
            state.cart = data.products;
            state.totalPrice = data.total;
        })
        .addCase(deleteCartItem.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error;
        })
        // .addCase(checkoutCart.pending, (state, action) => {
        //     state.isLoading = true;
        //     state.isError = false;
        //     state.error = null;
        // })
        // .addCase(checkoutCart.fulfilled, (state, action) => {
        //     const data = action.payload;
        //     state.isLoading = false;
        //     state.isError = false;
        //     state.error = null;
        //     data.products.forEach(item => item.isHovering = false);
        //     state.cart = data;
        //     state.qty = data.map(item => item.qty).reduce((acc, val) => acc + val);
        //     state.totalPrice = data.map(item => item.price * item.qty).reduce((acc, val) => acc + val);
        // })
        // .addCase(checkoutCart.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.isError = true;
        //     state.error = action.error;
        //     state.error = null;
        // })
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