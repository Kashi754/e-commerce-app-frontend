import { useDispatch, useSelector } from "react-redux";
import { 
  loadCartData,  
  editCartItem, 
  deleteCartItem, 
  selectCart, 
  selectPrice, 
  selectIsLoading, 
  selectIsError, 
  selectError,
  setIsHovering
} from "./cartSlice";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import './cart.css';

export function Cart () {
  const cart = useSelector(selectCart);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const error = useSelector(selectError);
  const totalPrice = useSelector(selectPrice);
  const location = useLocation();
  const cartId = location.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(loadCartData);
  }, [dispatch]);

  function handleChange(e, productId) {
    dispatch(editCartItem({
      cartId,
      productId, 
      qty: e.target.value
    }));
  }

  function handleClick(e, productId) {
    dispatch(deleteCartItem({
      cartId,
      productId
    }));
  }

  function handleMouseOver(productId) {
    dispatch(setIsHovering({productId, isHovering: true}));
  }

  function handleMouseOut(productId) {
    dispatch(setIsHovering({productId, isHovering: false}));
  }

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
    <main className="cart">
      <form className="cart-card">
        <h2>Cart Items</h2>
        {
          cart.map((product) => {
            return (
              <fieldset key={product.id} className="cart-product">
                <Link to={`/products/${product.id}`} className="cart-product-card" key={product.id}>
                  <img src={`/images/products/${product.id}.jpg`} alt={product.name} />
                  <h4 className="cart-product-info">{product.name}</h4>
                </Link>
                <h5 className="cart-product-info">{`$${product.price}`}</h5>
                <div className="cart-product-field">
                  <label className="product-info" htmlFor={product.id}>qty: </label>
                  <input
                    className="qty-field"
                    type="number"
                    id={product.id}
                    name="quantity" 
                    value={product.qty} 
                    onChange={(e) => handleChange(e, product.id)} 
                  />
                  <button 
                    type="button" 
                    onClick={(e) => handleClick(e, product.id)} 
                    onMouseOver={() => handleMouseOver(product.id)} 
                    onMouseOut={() => handleMouseOut(product.id)}
                  />
                  <h6 style={{visibility: product.isHovering? "visible" : "hidden"}}>Delete Item?</h6>
                </div>
              </fieldset>
            )
          })
        }
        <div className="order-section">
          <h3>CART TOTAL: ${totalPrice}</h3>
        </div>

        <div className="button-container">
          <button type="button" className="checkout-button" onClick={() => navigate('/checkout')}>
            Go to Checkout
          </button>
        </div>
      </form>
    </main>
  )
}