import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApi } from '../../../utilities/fetchApi';

const url = process.env.REACT_APP_SERVER_URL;
const urlBase = `http://${url}`;

export const loadAdminOrders = createAsyncThunk(
  'adminOrders/loadAdminOrders',
  async (filter) => {
    const serverUrl = `${urlBase}/orders/admin?filter=${filter}`;

    return await getApi(serverUrl);
  }
);

const adminOrdersSlice = createSlice({
  name: 'adminOrders',
  initialState: {
    orders: [],
    isLoading: false,
    isError: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAdminOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loadAdminOrders.fulfilled, (state, action) => {
        const orders = action.payload;
        console.log(action.payload);
        state.isLoading = false;
        state.isError = false;
        state.orders = orders;
        state.error = null;
      })
      .addCase(loadAdminOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
        console.log(action.error);
      });
  },
});

export const selectOrders = (state) => state.adminOrders.orders;
export const selectIsLoading = (state) => state.adminOrders.isLoading;
export const selectIsError = (state) => state.adminOrders.isError;
export const selectError = (state) => state.adminOrders.error;
export default adminOrdersSlice.reducer;
