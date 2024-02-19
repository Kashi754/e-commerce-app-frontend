import { Link } from 'react-router-dom';
import './orderItem.css';
import formatMoney from 'accounting-js/lib/formatMoney';

export function OrderItem(props) {
  const { order } = props;
  const dt = new Date(order.date);

  return (
    <li className='order-item'>
      <div className='order-section'>
        <h3>ORDER PLACED</h3>
        <h4>{dt.toLocaleDateString() + ' | ' + dt.toLocaleTimeString()}</h4>
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
        <h3>TRACKING NUMBER</h3>
        <h4>{order.tracking_number || 'Not available'}</h4>
      </div>
      <div className='order-section'>
        <h3>{`ORDER ID`}</h3>
        <Link to={`/orders/${order.id}`}>{order.id}</Link>
      </div>
    </li>
  );
}
