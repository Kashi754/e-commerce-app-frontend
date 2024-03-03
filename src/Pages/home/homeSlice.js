import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApi } from '../../utilities/fetchApi';

export const loadProductCategories = createAsyncThunk(
  'home/loadProductCategories',
  async (_params, { rejectWithValue }) => {
    const url = process.env.REACT_APP_SERVER_URL;
    const serverUrl = `${url}/products/categories`;

    try {
      const response = await getApi(serverUrl, rejectWithValue);
      return response;
    } catch (error) {
      return rejectWithValue({ message: error.message, status: 400 });
    }
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    categories: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProductCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadProductCategories.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.error = null;
        state.categories = data;
      })
      .addCase(loadProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectCategories = (state) => state.home.categories;
export const selectIsLoading = (state) => state.home.isLoading;
export const selectError = (state) => state.home.error;
// export const { incrementCount, decrementCount, resetCount } = homeSlice.actions;
export default homeSlice.reducer;
