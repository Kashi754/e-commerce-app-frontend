import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApi } from '../../utilities/fetchApi';
import naturalCompare from '../../utilities/naturalCompare';

export const loadProductsData = createAsyncThunk(
  'products/loadProductsData',
  async (params, { rejectWithValue }) => {
    const url = process.env.REACT_APP_SERVER_URL;
    const serverUrl = params ? `${url}/products${params}` : `${url}/products`;

    try {
      const response = await getApi(serverUrl, rejectWithValue);
      return response;
    } catch (error) {
      return rejectWithValue({ message: error.message, status: 400 });
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
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
      .addCase(loadProductsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadProductsData.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.products = data.sort(naturalCompare);
        state.error = null;
      })
      .addCase(loadProductsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectProducts = (state) => state.products.products;
export const selectIsLoading = (state) => state.products.isLoading;
export const selectError = (state) => state.products.error;
export default productsSlice.reducer;
