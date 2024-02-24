import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApi } from '../../utilities/fetchApi';
import naturalCompare from '../../utilities/naturalCompare';

export const loadProductsData = createAsyncThunk(
  'products/loadProductsData',
  async (params) => {
    const url = process.env.REACT_APP_SERVER_URL;
    const serverUrl = params
      ? `http://${url}/products${params}`
      : `http://${url}/products`;
    return await getApi(serverUrl);
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    isLoading: false,
    isError: false,
    error: null,
  },
  reducers: {
    incrementCount(state) {
      state.count += 25;
    },
    decrementCount(state) {
      state.count -= 25;
    },
    resetCount(state) {
      state.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProductsData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(loadProductsData.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.products = data.sort(naturalCompare);
        state.error = null;
      })
      .addCase(loadProductsData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      });
  },
});

export const selectProducts = (state) => state.products.products;
export const selectIsLoading = (state) => state.products.isLoading;
export const selectIsError = (state) => state.products.isError;
export const selectError = (state) => state.products.error;
// export const { incrementCount, decrementCount, resetCount } = homeSlice.actions;
export default productsSlice.reducer;
