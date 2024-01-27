
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadProductData = createAsyncThunk(
    'product/loadProductData',
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

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: {},
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
        .addCase(loadProductData.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadProductData.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.product = data;
        })
        .addCase(loadProductData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export const selectProduct = (state) => state.product.product;
export const selectIsLoading = (state) => state.product.isLoading;
export const selectIsError = (state) => state.product.isError;
export const selectError = (state) => state.product.error;
// export const { incrementCount, decrementCount, resetCount } = homeSlice.actions;
export default productSlice.reducer;