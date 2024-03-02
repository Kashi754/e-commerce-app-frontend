import {
  loadOrderData,
  selectError,
  selectIsLoading,
  selectOrder,
} from './orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './order.css';
import { OrderCard } from '../../Components/orderCard/OrderCard';
import { quantum } from 'ldrs';
quantum.register();

export function Order() {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const order = useSelector(selectOrder);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(loadOrderData(location.pathname));
  }, [dispatch, location]);

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
    <main className='order'>
      <OrderCard order={order} />
    </main>
  );
}
