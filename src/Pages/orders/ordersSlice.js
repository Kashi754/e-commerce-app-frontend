import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApi } from '../../utilities/fetchApi';

export const loadOrdersData = createAsyncThunk(
  'orders/loadOrdersData',
  async () => {
    const url = process.env.REACT_APP_SERVER_URL;
    const serverUrl = `http://${url}/orders`;

    return await getApi(serverUrl);
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
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
      .addCase(loadOrdersData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(loadOrdersData.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.orders = data;
      })
      .addCase(loadOrdersData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      });
  },
});

export const selectOrders = (state) => state.orders.orders;
export const selectIsLoading = (state) => state.orders.isLoading;
export const selectIsError = (state) => state.orders.isError;
export const selectError = (state) => state.orders.error;
// export const { incrementCount, decrementCount, resetCount } = homeSlice.actions;
export default ordersSlice.reducer;
