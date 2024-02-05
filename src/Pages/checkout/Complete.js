import { PaymentStatus } from "../../Components/paymentStatus/PaymentStatus"
import { stripePromise } from "../../app/App";
import { Elements } from '@stripe/react-stripe-js';

export function Complete () {

  return (
    <main className="complete">
      <Elements stripe={stripePromise}>
        <PaymentStatus />
      </Elements>
    </main>
  )
}