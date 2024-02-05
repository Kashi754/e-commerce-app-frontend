import { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { postApi } from '../../utilities/fetchApi';
import { checkoutCart } from '../../Pages/cart/cartSlice';
import { useDispatch } from 'react-redux';

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
        let body;

        switch (paymentIntent.status) {
          case 'succeeded':
            body = {
              payment_intent: paymentIntent.id,
              payment_status: paymentIntent.status,
              shipping_address: paymentIntent.shipping.address,
              shipping_method: paymentIntent.shipping.carrier || 'none'
            }

            dispatch(checkoutCart(body));
            setMessage('Success! Payment received.');
            break;

          case 'processing':
            body = {
              payment_intent: paymentIntent.id,
              payment_status: paymentIntent.status,
              shipping_address: paymentIntent.shipping.address,
              shipping_method: paymentIntent.shipping.carrier || 'none'
            }

            dispatch(checkoutCart(body));
            setMessage("Payment processing. We'll update you when payment is received.");
            break;

          case 'requires_payment_method':
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage('Payment failed. Please try another payment method.');
            navigate('/checkout');
            break;

          default:
            setMessage('Something went wrong.');
            break;
        }
        setMessage(JSON.stringify(paymentIntent, null, 2));
      });
  }, [dispatch, navigate, stripe, searchParams]);


  return (<pre>{message}</pre>);
};