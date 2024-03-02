import {
  loadOrdersData,
  selectOrders,
  selectIsLoading,
  selectError,
} from './ordersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { OrderItem } from '../../Components/orderItem/OrderItem';
import './orders.css';
import { quantum } from 'ldrs';
quantum.register();

export function Orders() {
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadOrdersData());
  }, [dispatch]);

  if (isLoading) {
    return (
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
    );
  }

  if (error) {
    console.error('Error %d: ' + error.message, error.status);
  }

  return (
    <main className='orders'>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <OrderItem
              order={order}
              key={order.id}
            />
          ))}
        </ul>
      ) : (
        <h2>No orders found</h2>
      )}
    </main>
  );
}
