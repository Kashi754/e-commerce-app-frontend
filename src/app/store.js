import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from '../Pages/cart/cartSlice';
import homeSliceReducer from '../Pages/home/homeSlice';
import orderSliceReducer from '../Pages/order/orderSlice';
import ordersSliceReducer from '../Pages/orders/ordersSlice';
import productSliceReducer from '../Pages/product/productSlice';
import productsSliceReducer from '../Pages/products/productsSlice';
import userSliceReducer from '../Pages/user/userSlice';

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
