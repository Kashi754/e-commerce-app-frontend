
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadProductsData = createAsyncThunk(
    'products/loadProductsData',
    async(params) => {       
        const uri = process.env.SERVER_URI;
        const port = process.env.PORT;
        const serverUrl = `http://${uri}:${port}/products`;
        
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
            state.error = action.error.message;
        })
    }
});

export const selectProducts = (state) => state.products.products;
export const selectIsLoading = (state) => state.products.isLoading;
export const selectIsError = (state) => state.products.isError;
export const selectError = (state) => state.products.error;
// export const { incrementCount, decrementCount, resetCount } = homeSlice.actions;
export default productsSlice.reducer;