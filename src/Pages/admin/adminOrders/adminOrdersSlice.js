import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApi } from '../../../utilities/fetchApi';

const url = process.env.REACT_APP_SERVER_URL;
const urlBase = `http://${url}`;

export const loadAdminOrders = createAsyncThunk(
  'adminOrders/loadAdminOrders',
  async (filter, { rejectWithValue }) => {
    let serverUrl;
    if (filter) {
      serverUrl = `${urlBase}/orders/admin?filter=${filter}`;
    } else {
      serverUrl = `${urlBase}/orders/admin`;
    }
    try {
      const response = await getApi(serverUrl, rejectWithValue);
      return response;
    } catch (err) {
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);

const adminOrdersSlice = createSlice({
  name: 'adminOrders',
  initialState: {
    orders: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAdminOrders.pending, (state) => {
        state.isLoading = true;
        state.error = { ...state.error, load: null };
      })
      .addCase(loadAdminOrders.fulfilled, (state, action) => {
        const orders = action.payload;
        state.isLoading = false;
        state.orders = orders;
        state.error = { ...state.error, load: null };
      })
      .addCase(loadAdminOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = { ...state.error, load: action.payload };
      });
  },
});

export const selectOrders = (state) => state.adminOrders.orders;
export const selectIsLoading = (state) => state.adminOrders.isLoading;
export const selectError = (state) => state.adminOrders.error;
export default adminOrdersSlice.reducer;
