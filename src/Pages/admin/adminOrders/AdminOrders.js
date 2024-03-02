import OrdersSearchForm from '../../../Components/ordersSearchForm/OrdersSearchForm';
import { useDispatch, useSelector } from 'react-redux';
import formatMoney from 'accounting-js/lib/formatMoney';
import {
  selectOrders,
  selectIsLoading,
  loadAdminOrders,
} from '../../../Pages/admin/adminOrders/adminOrdersSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './adminOrders.css';
import { quantum } from 'ldrs';
import { selectUser } from '../../user/userSlice';
import { NotFound } from '../../notFound/NotFound';
quantum.register();

export function AdminOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.role === 'admin') dispatch(loadAdminOrders());
  }, [dispatch]);

  if (user.role !== 'admin') {
    return <NotFound />;
  }

  return (
    <main className='admin-orders'>
      <h1>Orders</h1>
      <OrdersSearchForm />
      {isLoading ? (
        <div
          data-testid='loader'
          className='loader'
        >
          {
            <l-quantum
              size={300}
              speed={1}
              color='#000000'
            />
          }
        </div>
      ) : (
        <div className='orders-list'>
          {orders.map((order) => (
            <Link
              to={`/orders/${order.id}`}
              key={order.id}
              className='order-item item-link'
            >
              <div className='order-section'>
                <h3>ORDER ID</h3>
                <h4>{order.id}</h4>
              </div>
              <div className='order-section'>
                <h3>ORDER PLACED</h3>
                <h4>
                  {new Date(order.date).toLocaleDateString() +
                    ' | ' +
                    new Date(order.date).toLocaleTimeString()}
                </h4>
              </div>
              <div className='order-section'>
                <h3>TOTAL</h3>
                <h4>{formatMoney(order.total)}</h4>
              </div>
              <div className='order-section'>
                <h3>PAYMENT STATUS</h3>
                <h4>{order.payment_status}</h4>
              </div>
              <div className='order-section'>
                <h3>SHIPPING STATUS</h3>
                <h4>{order.shipping_status}</h4>
              </div>
              <div className='order-section'>
                <h3>TRACKING #</h3>
                <h4>{order.tracking_number || 'Not Available'}</h4>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
