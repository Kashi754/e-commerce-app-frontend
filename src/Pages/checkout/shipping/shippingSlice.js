import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postApi } from '../../../utilities/fetchApi';

export const determineShippingServicesAndTransitTimes = createAsyncThunk(
  'shipping/determineShippingServicesAndTransitTimes',
  async (params) => {
    const url = process.env.REACT_APP_SERVER_URL;
    const urlBase = `http://${url}`;

    const serverUrl = `${urlBase}/cart/shipping`;

    return await postApi(serverUrl, params);
  }
);

const shippingSlice = createSlice({
  name: 'shipping',
  initialState: {
    address: {
      line1: null,
      line2: null,
      city: null,
      state: null,
      postal_code: null,
      residential: true,
    },
    accessToken: null,
    shippingInfo: [],
    selectedShippingInfo: {},
    isLoading: false,
    isError: false,
    error: null,
  },
  reducers: {
    setAddress(state, action) {
      state.address = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    toggleResidential(state, action) {
      state.address = { ...state.address, ...action.payload };
    },
    setSelectedShippingInfo(state, action) {
      state.selectedShippingInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(determineShippingServicesAndTransitTimes.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(
        determineShippingServicesAndTransitTimes.fulfilled,
        (state, action) => {
          const data = action.payload.sort(
            (a, b) => a.totalCharge - b.totalCharge
          );
          state.selectedShippingInfo = data[0];
          state.isLoading = false;
          state.isError = false;
          state.error = null;
          state.shippingInfo = data;
        }
      )
      .addCase(
        determineShippingServicesAndTransitTimes.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.error;
        }
      );
  },
});

export const selectAccessToken = (state) => state.shipping.accessToken;
export const selectAddress = (state) => state.shipping.address;
export const selectShippingInfo = (state) => state.shipping.shippingInfo;
export const selectIsLoading = (state) => state.shipping.isLoading;
export const selectIsError = (state) => state.shipping.isError;
export const selectError = (state) => state.shipping.error;
export const selectSelectedShippingInfo = (state) =>
  state.shipping.selectedShippingInfo;
export const {
  setAddress,
  setAccessToken,
  toggleResidential,
  setSelectedShippingInfo,
} = shippingSlice.actions;

export default shippingSlice.reducer;
