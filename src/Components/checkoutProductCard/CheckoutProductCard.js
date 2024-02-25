import formatMoney from 'accounting-js/lib/formatMoney';
import './checkoutProductCard.css';

export function CheckoutProductCard(props) {
  const { cart, cartTotal, shippingInfo } = props;
  const totalPrice = cartTotal + shippingInfo.totalCharge;

  return (
    <div className='checkout-product-card'>
      <h2>Cart Items</h2>
      <ol className='checkout-product-list'>
        {cart.map((product) => {
          return (
            <li
              className='checkout-product'
              key={product.id}
            >
              <h5 className='checkout-product-info checkout-item'>
                <span className='product-header'>Item:</span>
                <span className='product-value'>{product.name}</span>
              </h5>
              <div className='details-container'>
                <div className='checkout-product-details'>
                  <h5 className='checkout-product-info details'>
                    <span className='product-header'>Product ID:</span>
                    <span className='product-value'>{product.id}</span>
                  </h5>
                  <h5 className='checkout-product-info details'>
                    <span className='product-header'>Price:</span>
                    <span className='product-value'>
                      {formatMoney(product.price)}
                    </span>
                  </h5>
                  <h5 className='checkout-product-info details'>
                    <span className='product-header'>Qty:</span>
                    <span className='product-value'>{`${product.qty}`}</span>
                  </h5>
                  <h5 className='checkout-product-info details'>
                    <span className='product-header'>Total:</span>
                    <span className='product-value'>
                      {formatMoney(product.price * product.qty)}
                    </span>
                  </h5>
                </div>
              </div>
            </li>
          );
        })}
        <div className='price-container'>
          <h5>
            Shipping:{' '}
            <span className='shipping-service'>{`(${shippingInfo.serviceName})`}</span>
          </h5>
          <div className='price-section'>
            <h4>{formatMoney(cartTotal)}</h4>
            <h4 className='price-end'>
              {formatMoney(shippingInfo.totalCharge)}
            </h4>
            <h3>Total: {formatMoney(totalPrice)}</h3>
          </div>
        </div>
      </ol>
    </div>
  );
}
