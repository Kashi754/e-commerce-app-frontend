import './checkoutProductCard.css';

export function CheckoutProductCard(props) {
  const { cart, totalPrice } = props;

  return (
    <ol className="checkout-product-card">
      <h2>Cart Items</h2>
        {
          cart.map((product) => {
            return (
              <li className="checkout-product" key={product.id}>
                <h5 className="checkout-product-info checkout-item">
                  <span className="product-header">Item:</span>
                  <span className="product-value">{product.name}</span>
                </h5>
                <h5 className="checkout-product-info">
                  <span className="product-header">Product ID:</span>
                  <span className="product-value">{product.id}</span>
                </h5>
                <h5 className="checkout-product-info">
                  <span className="product-header">Price:</span>
                  <span className="product-value">{`$${Math.round(100 * (product.price * product.qty)) / 100}`}</span>
                </h5>
                <h5 className="checkout-product-info">
                  <span className="product-header">Qty:</span>
                  <span className="product-value">{`${product.qty}`}</span>
                </h5>
              </li>
            );
          })
        }
      <div className="order-section">
        <h3>CART TOTAL: ${totalPrice}</h3>
      </div>
    </ol>
  );
}