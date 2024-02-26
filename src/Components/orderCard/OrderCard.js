import formatMoney from 'accounting-js/lib/formatMoney';
import { Link, useNavigate } from 'react-router-dom';

export function OrderCard(props) {
  const { order } = props;
  const dt = new Date(order.date);
  const navigate = useNavigate();
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  return (
    <>
      <section className='order-item'>
        <div className='order-section'>
          <h3>ORDER PLACED</h3>
          <h4>{dt.toLocaleDateString() + ' | ' + dt.toLocaleTimeString()}</h4>
        </div>
        <div className='order-section'>
          <h3>TOTAL</h3>
          <h4>{formatMoney(order.total)}</h4>
        </div>
        <div className='order-section'>
          <h3>ORDER STATUS</h3>
          <h4>{order.shipping_status}</h4>
        </div>
        <div className='order-section'>
          <h3>{`ORDER # ${order.id}`}</h3>
          <Link to={''}>track order</Link>
        </div>
      </section>

      <section className='order-card shipping-address'>
        <h2>Shipping Information</h2>
        <h3>
          <span className='label'>Address 1: </span>
          {order.shipping_address.addr_line_1}
        </h3>
        {order.shipping_address.addr_line_2 && (
          <h3>
            <span className='label'>Address 2: </span>
            {order.shipping_address.addr_line_2}
          </h3>
        )}
        <h3>
          <span className='label'>City: </span>
          {order.shipping_address.city}
        </h3>
        <h3>
          <span className='label'>State: </span>
          {order.shipping_address.state}
        </h3>
        <h3>
          <span className='label'>Zip: </span>
          {order.shipping_address.zip_code}
        </h3>
      </section>

      <section className='order-card'>
        <h2>Ordered Items</h2>
        {order.products.map((product) => {
          return (
            <Link
              to={`/products/${product.id}`}
              className='order-product'
              key={product.id}
            >
              <div className='product-card'>
                <img
                  src={`http://${serverUrl}/assets/images/products/${product.image_file || product.id + '.jpg'}`}
                  alt={product.name}
                />
                <h4 className='product-info'>{product.name}</h4>
              </div>
              <h5 className='product-info'>{`Qty: ${product.qty}`}</h5>
              <h5 className='product-info'>{`${formatMoney(product.price)}`}</h5>
            </Link>
          );
        })}
        <div className='button-container'>
          <button
            type='button'
            onClick={() => navigate('/orders')}
          >
            Back to Orders
          </button>
        </div>
      </section>
    </>
  );
}
