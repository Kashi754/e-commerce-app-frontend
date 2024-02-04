
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi } from "../../utilities/fetchApi";

const initialState = {
    product: {
        id: 1, 
        name: 'bag', 
        price: 13.59,
        description: "Classic Monogram Embroidery Font & Personalized Gifts:Each personalized gifts bag is individual using a high thread density monogram in a classic font. Allowing you to give your Gifts a personal touch.So the monogrammed initial canvas tote bag could be as a great for women gift, mom gift, teacher gift, boss gift, coworker retirement gift, bride gift, hostess gift, friend gift, employee gift. Also, the monogrammed tote bags can be an adorable way to thank bridesmaids, mother of the bride.",
        qty_in_stock: 34
    },
    isLoading: false,
    isError: false,
    error: null
};

export const loadProductData = createAsyncThunk(
    'product/loadProductData',
    async(path) => {       
        const uri = process.env.REACT_APP_SERVER_URI;
        const port = process.env.REACT_APP_PORT;
        const serverUrl = `http://${uri}:${port}${path}`;
        
        return await getApi(serverUrl);
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
            state.error = action.error;
        })
    }
});

export const selectProduct = (state) => state.product.product;
export const selectIsLoading = (state) => state.product.isLoading;
export const selectIsError = (state) => state.product.isError;
export const selectError = (state) => state.product.error;
// export const { incrementCount, decrementCount, resetCount } = homeSlice.actions;
export default productSlice.reducer;