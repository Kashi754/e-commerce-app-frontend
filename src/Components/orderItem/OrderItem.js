import { Link } from "react-router-dom";
import './orderItem.css';

export function OrderItem(props) {
  const { order } = props;

  return (
    <li className="order-item">
      <div className="order-section">
        <h3>ORDER PLACED</h3>
        <h4>{order.date}</h4>
      </div>
      <div className="order-section">
        <h3>TOTAL</h3>
        <h4>{order.total}</h4>
      </div>
      <div className="order-section">
        <h3>ORDER STATUS</h3>
        <h4>{order.status}</h4>
      </div>
      <div className="order-section">
        <h3>{`ORDER # ${order.id}`}</h3>
        <Link to={`/orders/${order.id}`}>View order details</Link>
      </div>
    </li>
  );
}