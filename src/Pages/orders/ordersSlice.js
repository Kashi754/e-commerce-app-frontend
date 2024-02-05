
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi } from "../../utilities/fetchApi";

const initialState = {
    orders: [
        {
            id: 1,
            date: '02/24/1989',
            total: '$100',
            status: 'delivered'
        },
        {
            id: 2,
            date: '03/05/1991',
            total: '$348.99',
            status: 'canceled'
        },
        {
            id: 3,
            date: '04/27/2013',
            total: '$100',
            status: 'pending'
        },
    ],
    isLoading: false,
    isError: false,
    error: null
};

export const loadOrdersData = createAsyncThunk(
    'orders/loadOrdersData',
    async() => {       
        const url = process.env.REACT_APP_SERVER_URl;
        const serverUrl = `http://${url}/orders`;
        
        return await getApi(serverUrl);
    }
)

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
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
        .addCase(loadOrdersData.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadOrdersData.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.orders = data;
        })
        .addCase(loadOrdersData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error;
        })
    }
});

export const selectOrders = (state) => state.orders.orders;
export const selectIsLoading = (state) => state.orders.isLoading;
export const selectIsError = (state) => state.orders.isError;
export const selectError = (state) => state.orders.error;
// export const { incrementCount, decrementCount, resetCount } = homeSlice.actions;
export default ordersSlice.reducer;