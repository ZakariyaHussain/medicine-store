import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // ⬅️ Import
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError('');

    try {
      const res = await axiosSecure.post('/create-payment-intent', { amount: total });
      const clientSecret = res.data.clientSecret;

      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Test User',
          },
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');

        // Optional: Save order to database here

        // Navigate to invoice page with state or ID
        navigate('/invoice', {
          state: {
            transactionId: paymentResult.paymentIntent.id,
            amount: total,
            date: new Date().toLocaleString(),
          },
        });
      }
    } catch (err) {
      setError('Payment failed');

    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded max-w-md mx-auto">
      <CardElement className="p-3 border rounded" />
      {error && <p className="text-red-500">{error}</p>}
      <button className="btn btn-primary w-full" type="submit" disabled={!stripe || processing}>
        {processing ? 'Processing…' : `Pay ৳${total}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
