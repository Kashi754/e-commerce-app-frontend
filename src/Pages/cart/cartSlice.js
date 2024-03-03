import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApi, postApi, putApi, deleteApi } from '../../utilities/fetchApi';

const url = process.env.REACT_APP_SERVER_URL;
const serverUrl = `${url}/cart/`;

export const loadCartData = createAsyncThunk(
  'cart/loadCartData',
  async (_params, { rejectWithValue }) => {
    try {
      const response = await getApi(serverUrl);
      return response;
    } catch (error) {
      return rejectWithValue({ message: error.message, status: 400 });
    }
  }
);

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async (params, { rejectWithValue }) => {
    const { productId, qty } = params;

    const itemData = {
      productId,
      qty,
    };

    try {
      const response = await postApi(serverUrl, itemData);
      return response;
    } catch (error) {
      return rejectWithValue({ message: error.message, status: 400 });
    }
  }
);

export const editCartItem = createAsyncThunk(
  'cart/editCartItem',
  async (params, { rejectWithValue }) => {
    const { productId, qty } = params;

    const itemData = {
      productId,
      qty,
    };

    try {
      const response = await putApi(serverUrl, itemData);
      return response;
    } catch (error) {
      return rejectWithValue({ message: error.message, status: 400 });
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async (productId, { rejectWithValue }) => {
    const serverProductUrl = `${url}/cart/?product_id=${productId}`;

    try {
      const response = await deleteApi(serverProductUrl);
      return response;
    } catch (error) {
      return rejectWithValue({ message: error.message, status: 400 });
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    qty: 0,
    totalPrice: 0,
    isLoading: false,
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
        state.error = { ...state.error, load: null };
      })
      .addCase(loadCartData.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.error = { ...state.error, load: null };
        if (data.products.length > 0) {
          data.products.forEach((item) => (item.isHovering = false));
          state.qty = data.products
            .map((item) => item.qty)
            .reduce((acc, val) => acc + val);
          state.totalWeight = data.products
            .map((item) => item.weight || 0)
            .reduce((acc, val) => acc + val);
        } else {
          state.qty = 0;
        }
        state.cart = data.products;
        state.totalPrice = parseFloat(data.total);
      })
      .addCase(loadCartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = { ...state.error, load: action.payload };
        state.cart = [];
        state.qty = 0;
        state.totalPrice = 0;
        state.totalWeight = 0;
      })
      .addCase(addCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.error = { ...state.error, add: null };
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.error = { ...state.error, add: null };
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
        state.error = { ...state.error, add: action.payload };
      })
      .addCase(editCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = { ...state.error, edit: null };
      })
      .addCase(editCartItem.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.error = { ...state.error, edit: null };
        data.products.forEach((item) => (item.isHovering = false));
        state.cart = data.products;
        state.qty = data.products
          .map((item) => item.qty)
          .reduce((acc, val) => acc + val);
        state.totalPrice = parseFloat(data.total);
      })
      .addCase(editCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = { ...state.error, edit: action.payload };
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = { ...state.error, delete: null };
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.error = { ...state.error, delete: null };
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
        state.error = { ...state.error, delete: action.payload };
      });
  },
});

export const selectCart = (state) => state.cart.cart;
export const selectQty = (state) => state.cart.qty;
export const selectPrice = (state) => state.cart.totalPrice;
export const selectWeight = (state) => state.cart.totalWeight;
export const selectIsLoading = (state) => state.cart.isLoading;
export const selectError = (state) => state.cart.error;
export const { setIsHovering } = cartSlice.actions;
export default cartSlice.reducer;
