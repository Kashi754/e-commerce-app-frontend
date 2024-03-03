import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApi } from '../../utilities/fetchApi';

export const loadOrderData = createAsyncThunk(
  'order/loadOrderData',
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

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: {},
    isLoading: true,
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
      .addCase(loadOrderData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadOrderData.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.error = null;
        state.order = data;
      })
      .addCase(loadOrderData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectOrder = (state) => state.order.order;
export const selectIsLoading = (state) => state.order.isLoading;
export const selectError = (state) => state.order.error;
export default orderSlice.reducer;
