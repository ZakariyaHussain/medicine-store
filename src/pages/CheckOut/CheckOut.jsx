import React from 'react';
import { useCart } from '../../contexts/CartContext';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';

const Checkout = () => {
  const { cart } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return <div className="p-5 text-xl">Your cart is empty.</div>;
  }

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="overflow-x-auto mb-4">
        <CheckoutForm total={totalPrice}></CheckoutForm>
      </div>

    </div>
  );
};

export default Checkout;
