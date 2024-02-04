
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi } from "../../utilities/fetchApi";

const initialState = {
    order: {
        id: 1,
        date: '02/01/2024',
        total: 130.06,
        status: 'delivered',
        products: [
            {id: 1, name: 'bag', price: 13.59, qty: 2},
            {id: 2, name: 'tool', price: 19.99, qty: 1},
            {id: 3, name: 'watch', price: 27.63, qty: 3},
        ],
        shipping_address: {
            addr_line_1: '117 Harrington Rd',
            addr_line_2: null,
            city: 'Newport News',
            state: 'VA',
            zip_code: 23602
        }
    },
    isLoading: false,
    isError: false,
    error: null
};

export const loadOrderData = createAsyncThunk(
    'order/loadOrderData',
    async(orderId) => {       
        const uri = process.env.REACT_APP_SERVER_URI;
        const port = process.env.REACT_APP_PORT;
        const serverUrl = `http://${uri}:${port}/orders/${orderId}`;
        
        return await getApi(serverUrl);
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
            state.error = action.error;
        })
    }
});

export const selectOrder = (state) => state.order.order;
export const selectIsLoading = (state) => state.order.isLoading;
export const selectIsError = (state) => state.order.isError;
export const selectError = (state) => state.order.error;
// export const { incrementCount, decrementCount, resetCount } = homeSlice.actions;
export default orderSlice.reducer;