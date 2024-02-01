import './App.css';
import { Root } from '../Pages/root/Root';
import { Cart } from '../Pages/cart/Cart';
import { Checkout } from '../Pages/checkout/Checkout';
import { Home } from '../Pages/home/Home';
import { Login } from '../Pages/login/Login';
import { Order } from '../Pages/order/Order';
import { Orders } from '../Pages/orders/Orders';
import { Product } from '../Pages/product/Product';
import { Products } from '../Pages/products/Products';
import { Registration } from '../Pages/registration/Registration';
import { User } from '../Pages/user/User';
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
      <Route path='products' element={<Products />} />
      <Route path='products/:id' element={<Product />} />
      <Route path='registration' element={<Registration />} />
      <Route path='user' element={<User />} />
    </Route>
  );

  return routes;
}

export default App;
