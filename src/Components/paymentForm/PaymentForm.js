import { useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import './paymentForm.css';
import { useSelector } from 'react-redux';
import {
  selectAddress,
  selectSelectedShippingInfo,
} from '../../Pages/checkout/shipping/shippingSlice';
import { selectUser } from '../../Pages/user/userSlice';

export function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const address = useSelector(selectAddress);
  const selectedShippingInfo = useSelector(selectSelectedShippingInfo);
  const user = useSelector(selectUser);

  const url = process.env.REACT_APP_URL;

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // eslint-disable-next-line no-unused-vars
    const { residential, ...shippingAddress } = address;
    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        shipping: {
          name: user.first_name + ' ' + user.last_name,
          address: shippingAddress,
          carrier: selectedShippingInfo.serviceType,
        },
        return_url: `${url}/checkout/complete`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setErrorMessage(error.message);
    } else {
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <form
      className='checkout-form'
      onSubmit={handleSubmit}
    >
      <h5>Shipping Information:</h5>
      <section className='shipping-address-section'>
        <h3>
          <span className='label'>Address 1: </span>
          {address.line1}
        </h3>
        {address.line2 && (
          <h3>
            <span className='label'>Address 2: </span>
            {address.line2}
          </h3>
        )}
        <h3>
          <span className='label'>City: </span>
          {address.city}
        </h3>
        <h3>
          <span className='label'>State: </span>
          {address.state}
        </h3>
        <h3>
          <span className='label'>Zip Code: </span>
          {address.postal_code}
        </h3>
        <h3>
          <span className='label'>Residential: </span>
          {address.residential ? 'YES' : 'NO'}
        </h3>
      </section>
      <h5>Payment Details:</h5>
      <PaymentElement />
      <button
        type='submit'
        className='checkout-button'
        disabled={!stripe}
      >
        Submit Payment
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
}
