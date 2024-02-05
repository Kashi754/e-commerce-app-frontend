import React, {useState} from 'react';
import {useStripe, useElements, PaymentElement, AddressElement} from '@stripe/react-stripe-js';
import './checkoutForm.css';

export function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [address, setAddress] = useState(null);

  const url = process.env.REACT_APP_URL;
  const protocol = process.env.NODE_ENV === 'development'? 'http' : 'https';

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const response = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${protocol}://${url}/checkout/complete`,
      },
    });


    if (response.error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(response.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form className='checkout-form' onSubmit={handleSubmit}>
      <h5>Shipping Address:</h5>
      <AddressElement options={{mode: 'shipping', allowedCountries: ['US']}} onChange={(event) => setAddress(event.value)} />
      <h5>Payment Details:</h5>
      <PaymentElement />
      <button type="submit" className="checkout-button" disabled={!stripe}>
        Submit Payment
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
};
