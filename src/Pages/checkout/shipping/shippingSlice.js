
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi, putApi } from "../../../utilities/fetchApi";

const initialState = {
  access_token: null,
  expires_in: null,
  scope: null
};

const url = 'https://apis-sandbox.fedex.com';

export const determineShippingServices = createAsyncThunk(
  'shipping/determineShippingServices',
  async(params) => {
    const { cart, shippingAddress, accessToken } = params;
    const path = '/availability/v1/packageandserviceoptions'

    const body = JSON.stringify({
      shipper: {
        address: {
          postalCode: 23602,
          countryCode: 'US',
        }
      },
      recipients: [{
        address: {
          postalCode: shippingAddress.zip,
          countryCode: 'US',
        }
      }],
      requestedPackageLineItems: [{
        weight: {
          units: 'LB',
          value: cart.totalWeight
        }
      }],
      carrierCodes: [
        'FDXG'
      ]
    });

    const response = await fetch(url + path, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          'X-locale': "en_US",
          'Authorization': `Bearer ${accessToken}`
      },
      body: body,
      credentials: 'include'
    });

    if(!response.ok) {
        const error = await response.json();
        throw error;
    }

    const data = await response.json();
    return data;
  }
)

export const determineTransitTimes = createAsyncThunk(
  'shipping/determineTransitTimes',
  async(params) => {
    const { cart, shippingAddress, accessToken } = params;
    const path = '/availability/v1/transittimes';

    const body = JSON.stringify({
      shipper: {
        address: {
          postalCode: 23602,
          countryCode: 'US',
        }
      },
      recipients: [{
        address: {
          postalCode: shippingAddress.zip,
          countryCode: 'US',
        }
      }],
      packagingType: 'FEDEX_MEDIUM_BOX',
      requestedPackageLineItems: [{
        declaredValue: {
          amount: Number(cart.totalPrice.replace(/[^0-9.-]+/g,"")),
          currency: 'USD'
        },
        weight: {
          units: 'LB',
          value: cart.totalWeight
        }
      }],
      carrierCodes: [
        'FDXG'
      ]
    });

    const response = await fetch(url + path, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          'X-locale': "en_US",
          'Authorization': `Bearer ${accessToken}`
      },
      body: body,
      credentials: 'include'
    });

    if(!response.ok) {
        const error = await response.json();
        throw error;
    }

    const data = await response.json();
    return data;
  }
)

const shippingSlice = createSlice({
  name: 'shipping',
  initialState: {
    address: {
      line1: null,
      line2: null,
      city: null,
      state: null,
      postal_code: null,
      residential: true
    },
    accessToken: null,
    transitTimes: [],
    shippingServices: [],
  },
  reducers: {
    setAddress(state, action) {
      state.address = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(determineShippingServices.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    })
    .addCase(determineShippingServices.fulfilled, (state, action) => {
      const data = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.shippingServices = data.output.serviceOptions;
    })
    .addCase(determineShippingServices.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error;
    })
    .addCase(determineTransitTimes.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    })
    .addCase(determineTransitTimes.fulfilled, (state, action) => {
      const data = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.transitTimes = data.output.transitTimes;
    })
    .addCase(determineTransitTimes.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error;
    })
  }
});

export const selectAccessToken = (state) => state.accessToken;
export const selectAddress = (state) => state.shipping.address;
export const selectTransitTimes = (state) => state.shipping.transitTimes;
export const selectShippingServices = (state) => state.shipping.shippingServices;
export const selectIsLoading = (state) => state.shipping.isLoading;
export const selectIsError = (state) => state.shipping.isError;
export const selectError = (state) => state.shipping.error;
export const { setAddress, setAccessToken } = shippingSlice.actions;
export default shippingSlice.reducer;