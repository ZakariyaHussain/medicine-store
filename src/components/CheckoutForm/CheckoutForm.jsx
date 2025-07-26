import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useCart } from '../../contexts/CartContext';
import UseAuth from '../../hooks/useAuth';

const CheckoutForm = ({ total }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { cart, setCart } = useCart();
    const { user } = UseAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setProcessing(true);
        setError('');

        try {
            // 1. Get clientSecret from backend
            const res = await axiosSecure.post('/create-payment-intent', { amount: total });
            const clientSecret = res.data.clientSecret;

            // 2. Confirm card payment
            const cardElement = elements.getElement(CardElement);
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: user?.displayName || 'Anonymous',
                        email: user?.email || 'unknown@example.com'
                    },
                },
            });

            // 3. Handle errors
            if (paymentResult.error) {
                setError(paymentResult.error.message);
            } else if (paymentResult.paymentIntent.status === 'succeeded') {
                toast.success('Payment successful!');

                // 4. Save payment info to MongoDB
                const paymentData = {
                    email: user?.email,
                    amount: total,
                    transactionId: paymentResult.paymentIntent.id,
                    // date: new Date().toLocaleString(),
                    date: new Date().toISOString(),
                    status: 'paid',
                    items: cart.map(item => ({
                        _id: item._id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        sellerEmail: item.sellerEmail || 'unknown',
                    })),
                };

                const saveRes = await axiosSecure.post('/payments', paymentData);
                if (saveRes.data.insertedId) {
                    toast.success('Payment saved!');
                    // Clear the cart
                    setCart([]);

                    // 5. Navigate to invoice page
                    navigate('/invoice', {
                        state: {
                            transactionId: paymentResult.paymentIntent.id,
                            date: new Date().toLocaleString(),
                            user: {
                                name: user?.displayName || 'Anonymous',
                                email: user?.email || 'unknown@example.com'
                            },
                            cartItems: cart,
                            total: total,
                        },
                    });
                } else {
                    toast.error('Payment saved failed.');
                }
            }
        } catch (err) {
            setError('Payment failed');
            console.error(err);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded max-w-md mx-auto">
            <CardElement className="p-3 border rounded" />
            {error && <p className="text-red-500">{error}</p>}
            <button className="btn btn-primary w-full" type="submit" disabled={!stripe || processing}>
                {processing ? 'Processing…' : `Pay ${total} ৳`}
            </button>
        </form>
    );
};

export default CheckoutForm;
