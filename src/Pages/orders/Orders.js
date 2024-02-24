import {
  loadOrdersData,
  selectOrders,
  selectIsLoading,
  selectError,
  selectIsError,
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
  const isError = useSelector(selectIsError);
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

  if (isError) {
    console.error(error);
  }

  return (
    <main className='orders'>
      <ul>
        {orders.map((order) => (
          <OrderItem
            order={order}
            key={order.id}
          />
        ))}
      </ul>
    </main>
  );
}
