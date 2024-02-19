import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApi } from '../../utilities/fetchApi';

export const loadProductData = createAsyncThunk(
  'product/loadProductData',
  async (path) => {
    const url = process.env.REACT_APP_SERVER_URL;
    const serverUrl = `http://${url}${path}`;

    return await getApi(serverUrl);
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: {},
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
      .addCase(loadProductData.pending, (state) => {
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
      });
  },
});

export const selectProduct = (state) => state.product.product;
export const selectIsLoading = (state) => state.product.isLoading;
export const selectIsError = (state) => state.product.isError;
export const selectError = (state) => state.product.error;
// export const { incrementCount, decrementCount, resetCount } = homeSlice.actions;
export default productSlice.reducer;
