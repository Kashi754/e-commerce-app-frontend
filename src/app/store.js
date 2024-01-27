import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from '../pages/cart/cartSlice';
import homeSliceReducer from '../pages/home/homeSlice';
import orderSliceReducer from '../pages/order/orderSlice';
import ordersSliceReducer from '../pages/orders/ordersSlice';
import productSliceReducer from '../pages/product/productSlice';
import productsSliceReducer from '../pages/products/productsSlice';
import userSliceReducer from '../pages/user/userSlice';

const rootReducer = {
  cart: cartSliceReducer,
  home: homeSliceReducer,
  order: orderSliceReducer,
  orders: ordersSliceReducer,
  product: productSliceReducer,
  products: productsSliceReducer,
  user: userSliceReducer,
};

export const store = configureStore({
  reducer: rootReducer
});

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
