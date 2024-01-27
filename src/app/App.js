import React from 'react';
import './App.css';
import { Root } from '../pages/root/Root';
import { Cart } from '../pages/cart/Cart';
import { Checkout } from '../pages/checkout/Checkout';
import { Home } from '../pages/home/Home';
import { Login } from '../pages/login/Login';
import { Order } from '../pages/order/Order';
import { Orders } from '../pages/orders/Orders';
import { Product } from '../pages/product/Product';
import { Products } from '../pages/products/Products';
import { Registration } from '../pages/registration/Registration';
import { createRoutesFromElements, Route } from 'react-router-dom';

function App() {
  const routes = createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<Home />} />
      <Route path='cart' element={<Cart />} />
      <Route path='checkout' element={<Checkout />} />
      <Route path='login' element={<Login />} />
      <Route path='orders' element={<Orders />} />
      <Route path='orders/:id' element={<Order />} />
      <Route path='product' element={<Products />} />
      <Route path='product/:id' element={<Product />} />
      <Route path='registration' element={<Registration />} />
    </Route>
  );

  return routes;
}

export default App;
