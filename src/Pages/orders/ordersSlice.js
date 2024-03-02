import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApi } from '../../utilities/fetchApi';

export const loadOrdersData = createAsyncThunk(
  'orders/loadOrdersData',
  async (_params, { rejectWithValue }) => {
    const url = process.env.REACT_APP_SERVER_URL;
    const serverUrl = `http://${url}/orders`;

    try {
      const response = await getApi(serverUrl, rejectWithValue);
      return response;
    } catch (error) {
      return rejectWithValue({ message: error.message, status: 400 });
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
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
      .addCase(loadOrdersData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadOrdersData.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.error = null;
        state.orders = data;
      })
      .addCase(loadOrdersData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectOrders = (state) => state.orders.orders;
export const selectIsLoading = (state) => state.orders.isLoading;
export const selectError = (state) => state.orders.error;
// export const { incrementCount, decrementCount, resetCount } = homeSlice.actions;
export default ordersSlice.reducer;
