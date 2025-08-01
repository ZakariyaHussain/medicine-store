import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
//import { Link } from 'react-router';
//import { useNavigate } from 'react-router';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  //const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <div className="p-5 text-center text-gray-500">Your cart is empty.</div>;
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Company</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((med, index) => (
              <tr key={med._id}>
                <td>{index + 1}</td>
                <td>{med.itemName}</td>
                <td>{med.company || 'N/A'}</td>
                <td>{med.price} ৳</td>
                <td className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(med._id, -1)} className="btn btn-sm btn-outline">
                    <Minus size={14} />
                  </button>
                  <span>{med.quantity}</span>
                  <button onClick={() => updateQuantity(med._id, +1)} className="btn btn-sm btn-outline">
                    <Plus size={14} />
                  </button>
                </td>
                <td>{med.price * med.quantity} ৳</td>
                <td>
                  <button onClick={() => removeFromCart(med._id)} className="btn btn-sm btn-error">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-right mt-4 font-semibold text-lg">
          Total: {totalPrice} ৳
        </div>
        <Link to='/checkout'>
            <button
              className="btn btn-success w-full mt-8"
            >
              Proceed to Checkout
            </button>
          </Link>

      </div>
    </div>
  );
};

export default Cart;
