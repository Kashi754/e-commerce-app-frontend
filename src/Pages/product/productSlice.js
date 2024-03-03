import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApi } from '../../utilities/fetchApi';

export const loadProductData = createAsyncThunk(
  'product/loadProductData',
  async (path, { rejectWithValue }) => {
    const url = process.env.REACT_APP_SERVER_URL;
    const serverUrl = `${url}${path}`;

    try {
      const response = await getApi(serverUrl, rejectWithValue);
      return response;
    } catch (error) {
      return rejectWithValue({ message: error.message, status: 400 });
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: {},
    isLoading: false,
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
        state.error = null;
      })
      .addCase(loadProductData.fulfilled, (state, action) => {
        const data = action.payload;
        state.error = null;
        state.isLoading = false;
        state.product = data;
      })
      .addCase(loadProductData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectProduct = (state) => state.product.product;
export const selectIsLoading = (state) => state.product.isLoading;
export const selectError = (state) => state.product.error;
export default productSlice.reducer;
