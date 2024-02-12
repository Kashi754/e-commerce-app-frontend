import { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadCartData } from '../../Pages/cart/cartSlice';

export function PaymentStatus() {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!stripe) {
      return;
    }
    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = searchParams.get('payment_intent_client_secret');
    
    if(!clientSecret) {
      return;
    }
    // Retrieve the PaymentIntent
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({paymentIntent}) => {
        // Inspect the PaymentIntent `status` to indicate the status of the payment
        // to your customer.
        //
        // Some payment methods will [immediately succeed or fail][0] upon
        // confirmation, while others will first enter a `processing` state.
        //
        // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification

        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Success! Payment received.');
            dispatch(loadCartData());
            break;

          case 'processing':
            setMessage("Payment processing. We'll update you when payment is received.");
            dispatch(loadCartData());
            break;

          case 'requires_payment_method':
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage('Payment failed. Please try another payment method.');
            navigate('/checkout/payment');
            break;

          default:
            setMessage('Something went wrong.');
            break;
        }
      });
  }, [dispatch, navigate, stripe, searchParams]);


  return (<pre>{message}</pre>);
};