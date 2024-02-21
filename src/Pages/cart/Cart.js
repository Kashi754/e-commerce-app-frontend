import { useDispatch, useSelector } from 'react-redux';
import {
  editCartItem,
  deleteCartItem,
  selectCart,
  selectPrice,
  selectIsLoading,
  selectIsError,
  selectError,
  setIsHovering,
} from './cartSlice';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import './cart.css';
import formatMoney from 'accounting-js/lib/formatMoney';

export function Cart() {
  const cart = useSelector(selectCart);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const error = useSelector(selectError);
  const totalPrice = useSelector(selectPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  function handleChange(e, productId) {
    if (e.target.value === '0') {
      dispatch(deleteCartItem(productId));
    } else {
      dispatch(
        editCartItem({
          productId,
          qty: e.target.value,
        })
      );
    }
  }

  function handleClick(e, productId) {
    e.preventDefault();
    dispatch(deleteCartItem(productId));
  }

  function handleMouseOver(productId) {
    dispatch(setIsHovering({ productId, isHovering: true }));
  }

  function handleMouseOut(productId) {
    dispatch(setIsHovering({ productId, isHovering: false }));
  }

  // if(isLoading) {
  //   return (
  //     <div data-testid='loader' className="loader">
  //         {<l-quantum
  //             size={300}
  //             speed={1}
  //             color='#000000'
  //         />}
  //     </div>
  //   )
  // }

  // if(isError) {
  //   return (
  //       <div className="error">
  //           <p role='alert'>{error}</p>
  //       </div>
  //   )
  // }

  return (
    <main className='cart'>
      <form className='cart-card'>
        <h2>Your Cart</h2>
        {cart.length > 0 &&
          cart.map((product) => {
            return (
              <fieldset
                key={product.id}
                className='cart-product'
              >
                <Link
                  to={`/products/${product.id}`}
                  className='cart-product-card'
                  key={product.id}
                >
                  <img
                    src={`http://${serverUrl}/assets/images/products/${product.id}.jpg`}
                    alt={product.name}
                  />
                  <h4 className='cart-product-info'>{product.name}</h4>
                </Link>
                <h5 className='cart-product-info'>{`${formatMoney(product.price)}`}</h5>
                <div className='cart-product-field'>
                  <label
                    className='product-info'
                    htmlFor={product.id}
                  >
                    qty:{' '}
                  </label>
                  <input
                    className='qty-field'
                    type='number'
                    id={product.id}
                    name='quantity'
                    value={product.qty}
                    onChange={(e) => handleChange(e, product.id)}
                  />
                  <button
                    type='button'
                    onClick={(e) => handleClick(e, product.id)}
                    onMouseOver={() => handleMouseOver(product.id)}
                    onMouseOut={() => handleMouseOut(product.id)}
                  />
                  <h6
                    style={{
                      visibility: product.isHovering ? 'visible' : 'hidden',
                    }}
                  >
                    Delete Item?
                  </h6>
                </div>
              </fieldset>
            );
          })}
        {cart.length < 1 && (
          <h5 className='cart-product-info'>NOTHING IN CART</h5>
        )}
        <div className='order-section'>
          <h3>CART TOTAL: {formatMoney(totalPrice)}</h3>
        </div>

        <div className='button-container'>
          <button
            type='button'
            className='checkout-button'
            onClick={() => navigate('/checkout/shipping')}
            disabled={cart.length < 1}
          >
            Go to Checkout
          </button>
        </div>
      </form>
    </main>
  );
}
