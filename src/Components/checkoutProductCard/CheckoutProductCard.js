import unformat from 'accounting-js/lib/unformat';
import formatMoney from 'accounting-js/lib/formatMoney';
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
                <div className="checkout-product-details">
                  <h5 className="checkout-product-info details">
                    <span className="product-header">Product ID:</span>
                    <span className="product-value">{product.id}</span>
                  </h5>
                  <h5 className="checkout-product-info details">
                    <span className="product-header">Price:</span>
                    <span className="product-value">{product.price}</span>
                  </h5>
                  <h5 className="checkout-product-info details">
                    <span className="product-header">Qty:</span>
                    <span className="product-value">{`${product.qty}`}</span>
                  </h5>
                  <h5 className="checkout-product-info details">
                    <span className="product-header">Total:</span>
                    <span className="product-value">{formatMoney(unformat(product.price) * product.qty)}</span>
                  </h5>
                </div>
              </li>
            );
          })
        }
      <div className="order-section">
        <h3>CART TOTAL: {totalPrice}</h3>
      </div>
    </ol>
  );
}