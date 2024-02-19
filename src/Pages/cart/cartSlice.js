import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApi, postApi, putApi, deleteApi } from '../../utilities/fetchApi';

const url = process.env.REACT_APP_SERVER_URL;

export const loadCartData = createAsyncThunk('cart/loadCartData', async () => {
  const serverUrl = `http://${url}/cart/`;

  return await getApi(serverUrl);
});

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async (params) => {
    const { productId, qty } = params;

    const itemData = {
      productId,
      qty,
    };

    const serverUrl = `http://${url}/cart/`;

    return await postApi(serverUrl, itemData);
  }
);

export const editCartItem = createAsyncThunk(
  'cart/editCartItem',
  async (params) => {
    const { productId, qty } = params;

    const itemData = {
      productId,
      qty,
    };

    const serverUrl = `http://${url}/cart/`;

    return await putApi(serverUrl, itemData);
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async (productId) => {
    const serverUrl = `http://${url}/cart/?product_id=${productId}`;

    return await deleteApi(serverUrl);
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    qty: 0,
    totalPrice: 0,
    isLoading: false,
    isError: false,
    error: {},
    totalWeight: 0,
  },
  reducers: {
    setIsHovering(state, action) {
      const productIndex = state.cart.findIndex(
        (item) => item.id === action.payload.productId
      );
      state.cart[productIndex].isHovering = action.payload.isHovering;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCartData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loadCartData.fulfilled, (state, action) => {
        const data = action.payload;
        if (data.products.length > 0) {
          data.products.forEach((item) => (item.isHovering = false));
          state.qty = data.products
            .map((item) => item.qty)
            .reduce((acc, val) => acc + val);
        } else {
          state.qty = 0;
        }
        state.cart = data.products;
        state.totalPrice = parseFloat(data.total);
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(loadCartData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      })
      .addCase(addCartItem.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        data.products.forEach((item) => (item.isHovering = false));
        state.cart = data.products;
        state.qty = data.products
          .map((item) => item.qty)
          .reduce((acc, val) => acc + val);
        state.totalWeight = data.products
          .map((item) => item.weight || 0)
          .reduce((acc, val) => acc + val);
        state.totalPrice = parseFloat(data.total);
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      })
      .addCase(editCartItem.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(editCartItem.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        data.products.forEach((item) => (item.isHovering = false));
        state.cart = data.products;
        state.qty = data.products
          .map((item) => item.qty)
          .reduce((acc, val) => acc + val);
        state.totalPrice = parseFloat(data.total);
      })
      .addCase(editCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        if (data.products.length > 0) {
          data.products.forEach((item) => (item.isHovering = false));
          state.qty = data.products
            .map((item) => item.qty)
            .reduce((acc, val) => acc + val);
        } else {
          state.qty = 0;
        }
        state.cart = data.products;
        state.totalPrice = parseFloat(data.total);
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      });
  },
});

export const selectCart = (state) => state.cart.cart;
export const selectQty = (state) => state.cart.qty;
export const selectPrice = (state) => state.cart.totalPrice;
export const selectWeight = (state) => state.cart.totalWeight;
export const selectIsLoading = (state) => state.cart.isLoading;
export const selectIsError = (state) => state.cart.isError;
export const selectError = (state) => state.cart.error;
export const { setIsHovering } = cartSlice.actions;
export default cartSlice.reducer;
