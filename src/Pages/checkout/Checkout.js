import { useDispatch, useSelector } from "react-redux";
import unformat from 'accounting-js/lib/unformat';
import { 
  selectCart, 
  selectPrice, 
  selectIsLoading, 
  selectIsError, 
  selectError,
} from "../cart/cartSlice";
import { useEffect, useState } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from "../../app/App";
import { CheckoutProductCard } from "../../Components/checkoutProductCard/CheckoutProductCard";
import './checkout.css';
import { CheckoutForm } from "../../Components/checkoutForm/CheckoutForm";
import { quantum } from "ldrs";
import { Link } from "react-router-dom";
quantum.register();

export function Checkout () {
  const cart = useSelector(selectCart);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const error = useSelector(selectError);
  const totalPrice = useSelector(selectPrice);
  const [ clientSecret, setClientSecret ] = useState(null);
  const dispatch = useDispatch();

  const url = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    if(totalPrice) {
      console.log(unformat(totalPrice));
      fetch(`http://${url}/secret?total=${unformat(totalPrice) * 100}`, {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          const {client_secret: clientSecret} = data;
          setClientSecret(clientSecret);
        });
    }
  }, [url, totalPrice])

  const options = {
    clientSecret: clientSecret,
    // Fully customizable with appearance API.
    appearance: {
      theme: 'stripe',
      variables: {
        fontWeightNormal: '500',
        borderRadius: '0.5rem',
        colorPrimary: '#7201b4',
        tabIconSelectedColor: '#fff',
        gridRowSpacing: '16px',
        spacingUnit: '0.25rem',
        colorText: '#7201b4'
      },
      rules: {
        '.Tab, .Input, .Block, .CheckboxInput, .CodeInput': {
          boxShadow: '0px 3px 10px rgba(18, 42, 66, 0.08)'
        },
        '.Block': {
          borderColor: 'transparent'
        },
        '.BlockDivider': {
          backgroundColor: '#ebebeb'
        },
        '.Tab, .Tab:hover, .Tab:focus': {
          border: '0',
          marginTop: '0.5rem'
        },
        '.Tab--selected, .Tab--selected:hover': {
          backgroundColor: '#7201b4',
          color: '#fff'
        }
      }
    },
  };

  if(isLoading || !clientSecret) {
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
      <Link className='link' to={'/'}>Continue Shopping</Link>
      <CheckoutProductCard cart={cart} totalPrice={totalPrice} />
      <Elements stripe={stripePromise} options={options} key={clientSecret}>
        <CheckoutForm />
      </Elements>
        <div className="button-container">
        </div>
    </main>
  )
}