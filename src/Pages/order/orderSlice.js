import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApi } from '../../utilities/fetchApi';

export const loadOrderData = createAsyncThunk(
  'order/loadOrderData',
  async (path) => {
    const url = process.env.REACT_APP_SERVER_URL;
    const serverUrl = `http://${url}${path}`;

    return await getApi(serverUrl);
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: {},
    isLoading: true,
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
      .addCase(loadOrderData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(loadOrderData.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.order = data;
      })
      .addCase(loadOrderData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      });
  },
});

export const selectOrder = (state) => state.order.order;
export const selectIsLoading = (state) => state.order.isLoading;
export const selectIsError = (state) => state.order.isError;
export const selectError = (state) => state.order.error;
// export const { incrementCount, decrementCount, resetCount } = homeSlice.actions;
export default orderSlice.reducer;
