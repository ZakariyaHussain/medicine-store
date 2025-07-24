import React from 'react';
//import { useNavigate } from 'react-router-dom';
//import toast from 'react-hot-toast';
import { useCart } from '../../contexts/CartContext';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';

const Checkout = () => {
  //const { cart, removeFromCart, updateQuantity } = useCart();
  const { cart } = useCart();
  //const navigate = useNavigate();

//   const handlePlaceOrder = () => {
//     // In a real app, you'd send the cart to the server here
//     toast.success('Order placed successfully!');
//     navigate('/'); // Navigate to home or orders page
//   };

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

      {/* <div className="text-right mb-4">
        <p className="text-lg font-semibold">Total: {totalPrice} ৳</p>
      </div>

      <div className="text-right">
        <button onClick={handlePlaceOrder} className="btn btn-primary">
          Place Order
        </button>
      </div> */}
    </div>
  );
};

export default Checkout;
