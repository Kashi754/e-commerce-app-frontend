import './App.css';
import { Root } from '../Pages/root/Root';
import { Cart } from '../Pages/cart/Cart';
import { Payment } from '../Pages/checkout/payment/Payment';
import { Complete } from '../Pages/checkout/complete/Complete';
import { Home } from '../Pages/home/Home';
import { Login } from '../Pages/login/Login';
import { Order } from '../Pages/order/Order';
import { Orders } from '../Pages/orders/Orders';
import { Product } from '../Pages/product/Product';
import { Products } from '../Pages/products/Products';
import { Registration } from '../Pages/registration/Registration';
import { User } from '../Pages/user/User';
import { Admin } from '../Pages/admin/Admin';
import { NotFound } from '../Pages/notFound/NotFound';
import { createRoutesFromElements, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Shipping } from '../Pages/checkout/shipping/Shipping';
import { AdminOrders } from '../Pages/admin/adminOrders/AdminOrders';
import { AdminUsers } from '../Pages/admin/adminUsers/AdminUsers';
import { Inventory } from '../Pages/admin/inventory/Inventory';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PROMISE);
const serverUrl = process.env.REACT_APP_SERVER_URL;

function App() {
  const routes = createRoutesFromElements(
    <>
      <Route
        path='/'
        element={<Root />}
      >
        <Route
          index
          element={<Home />}
        />
        <Route
          path='cart'
          element={<Cart />}
        />
        <Route
          path='/checkout/shipping'
          element={<Shipping />}
        />
        <Route
          path='/checkout/payment'
          element={<Payment />}
        />
        <Route
          path='/checkout/complete'
          element={<Complete />}
        />
        <Route
          path='login'
          element={<Login />}
        />
        <Route
          path='orders'
          element={<Orders />}
        />
        <Route
          path='orders/:id'
          element={<Order />}
        />
        <Route
          path='products'
          element={<Products />}
        />
        <Route
          path='products/:id'
          element={<Product />}
        />
        <Route
          path='registration'
          element={<Registration />}
        />
        <Route
          path='user'
          element={<User />}
        />
        <Route
          path='admin'
          element={<Admin />}
        />
        <Route
          path='admin/users'
          element={<AdminUsers />}
        />
        <Route
          path='admin/orders'
          element={<AdminOrders />}
        />
        <Route
          path='admin/inventory'
          element={<Inventory />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Route>
      <Route
        path='docs'
        element={
          <SwaggerUI
            url={`${serverUrl}/openapi.json`}
            withCredentials={true}
            persistAuthorization={true}
            tryItOutEnabled={false}
          />
        }
      />
    </>
  );

  return routes;
}

export default App;
