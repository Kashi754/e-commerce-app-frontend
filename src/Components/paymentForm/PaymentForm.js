import {useEffect, useState} from 'react';
import {useStripe, useElements, PaymentElement, AddressElement} from '@stripe/react-stripe-js';
import './paymentForm.css';
import { useSelector } from 'react-redux';
import { selectAddress } from '../../Pages/checkout/shipping/shippingSlice';
import { selectUser } from '../../Pages/user/userSlice';

export function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const {residential, ...address} = useSelector(selectAddress);
  const user = useSelector(selectUser);
  const [shipping, setShipping] = useState({
    carrier: null,
    trackingNumber: null
  });

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

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        shipping: {
          address
        },
        return_url: `${protocol}://${url}/checkout/complete`,
      },
    });


    if (error.type === "card_error" || error.type === "validation_error") {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("An unexpected error occurred.");
    }
  };

  useEffect(() => {
    console.log(address);
  }, [address]);

  return (
    <form className='checkout-form' onSubmit={handleSubmit}>
      <h5>Shipping Address:</h5>
      {/* <AddressElement options={{
          mode: 'shipping',
          allowedCountries: ['US'],
          defaultValues: {
            name: user.first_name + ' ' + user.last_name,
            address: {
              line1: address.line_1,
              line2: address.line_2,
              city: address.city,
              state: address.state,
              postal_code: address.zip,
              country: 'US'
            }
          }
        }}
      /> */}
      <h5>Payment Details:</h5>
      <PaymentElement />
      <button type="submit" className="checkout-button" disabled={!stripe}>
        Submit Payment
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
};
