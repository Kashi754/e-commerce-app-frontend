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
  checkoutCart
} from "../cart/cartSlice";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from "../../app/App";
import { CheckoutProductCard } from "../../Components/checkoutProductCard/CheckoutProductCard";
import './checkout.css';
import { CheckoutForm } from "../../Components/checkoutForm/CheckoutForm";

export function Checkout () {
  const cart = useSelector(selectCart);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const error = useSelector(selectError);
  const totalPrice = useSelector(selectPrice);
  const [ clientSecret, setClientSecret ] = useState(null);
  const location = useLocation();
  const cartId = location.pathname;
  const dispatch = useDispatch();

  const uri = process.env.REACT_APP_SERVER_URI;
  const port = process.env.REACT_APP_PORT;

  useEffect(() => {
    fetch(`http://${uri}:${port}/secret?total=${totalPrice}`)
      .then(response => response.json())
      .then(data => {
        const {client_secret: clientSecret} = data;
        setClientSecret(clientSecret);
      });
  }, [uri, port, totalPrice])
  
  useEffect(() => {
    dispatch(loadCartData);
  }, [dispatch]);

  const options = {
    clientSecret: clientSecret,
    // Fully customizable with appearance API.
    appearance: {/*...*/},
  };

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
    <main className="checkout">
      <CheckoutProductCard cart={cart} totalPrice={totalPrice} />
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
        <div className="button-container">
        </div>
    </main>
  )
}