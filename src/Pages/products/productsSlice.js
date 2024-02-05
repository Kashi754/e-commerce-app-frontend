
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi } from "../../utilities/fetchApi";

const initialState = {
    products: [
        {id: 1, name: 'bag', price: "$13.59"},
        {id: 2, name: 'tool', price: "$19.99"},
        {id: 3, name: 'watch', price: "$27.63"},
        {id: 4, name: 'toy', price: "$13.98"},
        {id: 5, name: 'toiletries', price: "$13.99"},
        {id: 6, name: 'projector', price: "$194.98"},
    ],
    isLoading: false,
    isError: false,
    error: null
};

export const loadProductsData = createAsyncThunk(
    'products/loadProductsData',
    async(params) => {
        const url = process.env.REACT_APP_SERVER_URL;
        const serverUrl = params ? 
            `http://${url}/products?${params}` : 
            `http://${url}/products`;
        return await getApi(serverUrl);
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
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
        .addCase(loadProductsData.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadProductsData.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.products = data;
        })
        .addCase(loadProductsData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error;
        })
    }
});

export const selectProducts = (state) => state.products.products;
export const selectIsLoading = (state) => state.products.isLoading;
export const selectIsError = (state) => state.products.isError;
export const selectError = (state) => state.products.error;
// export const { incrementCount, decrementCount, resetCount } = homeSlice.actions;
export default productsSlice.reducer;