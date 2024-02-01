import { loadOrderData, selectError, selectIsError, selectIsLoading, selectOrder } from "./orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './order.css';

export function Order() {
  const order = useSelector(selectOrder);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadOrderData());
  }, [dispatch]);

  if(isLoading) {
    return (
      <div data-testid='loader' className="loader">
          {<l-quantum
              size={300}
              speed={1}
              color='#000000'
          />}
      </div>
    )
  }

  // if(isError) {
  //   return (
  //       <div className="error">
  //           <p role='alert'>{error}</p>
  //       </div>
  //   )
  // }

  return (
    <main className="order">
      <section className="order-item">
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
          <Link to={''}>track order</Link>
        </div>
      </section>
      <section className="order-card shipping-address">
        <h2>Shipping Information</h2>
        <h3><span className="label">Address 1: </span>{order.shipping_address.addr_line_1}</h3>
        <h3><span className="label">Address 2: </span>{order.shipping_address.addr_line_2}</h3>
        <h3><span className="label">City: </span>{order.shipping_address.city}</h3>
        <h3><span className="label">State: </span>{order.shipping_address.state}</h3>
        <h3><span className="label">Zip: </span>{order.shipping_address.zip_code}</h3>
      </section>
      <section className="order-card order-products">
        <h2>Ordered Items</h2>
        {
          order.products.map((product) => {
            return (
              <Link to={`/products/${product.id}`} className="order-product" key={product.id}>
                <div className="product-card">
                  <img src={`/images/products/${product.id}.jpg`} alt={product.name} />
                  <h4 className="product-info">{product.name}</h4>
                </div>
                <h5 className="product-info">{`Qty: ${product.qty}`}</h5>
                <h5 className="product-info">{product.price}</h5>
              </Link>
            );
          })
        }
        <div className='button-container'>
              <button type="button" onClick={() => navigate('/orders')}>
                Back to Orders
              </button>
            </div>
      </section>
    </main>
  );
}