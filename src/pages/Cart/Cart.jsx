import React from 'react';
import { useLoaderData } from 'react-router';
//import { useCart } from '../context/CartContext';

const Cart = () => {
  //const { cartItems, updateQuantity, removeItem, clearCart } = useCart();
  const medicine = useLoaderData();
  console.log(medicine);

  return (
    // <div className="container mx-auto p-4">
    //   <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

    //   {cartItems.length === 0 ? (
    //     <p>Your cart is empty.</p>
    //   ) : (
    //     <>
    //       <table className="table w-full">
    //         <thead>
    //           <tr>
    //             <th>Name</th>
    //             <th>Company</th>
    //             <th>Price/unit</th>
    //             <th>Quantity</th>
    //             <th>Actions</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {cartItems.map(item => (
    //             <tr key={item._id}>
    //               <td>{item.itemName}</td>
    //               <td>{item.company}</td>
    //               <td>${item.price}</td>
    //               <td className="flex items-center gap-2">
    //                 <button className="btn btn-sm" onClick={() => updateQuantity(item._id, -1)}>-</button>
    //                 {item.quantity}
    //                 <button className="btn btn-sm" onClick={() => updateQuantity(item._id, 1)}>+</button>
    //               </td>
    //               <td>
    //                 <button className="btn btn-error btn-sm" onClick={() => removeItem(item._id)}>Remove</button>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //       <div className="mt-6 flex justify-between">
    //         <button className="btn btn-outline btn-error" onClick={clearCart}>Clear Cart</button>
    //         <h3 className="text-xl font-bold">
    //           Total: ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
    //         </h3>
    //       </div>
    //     </>
    //   )}
    // </div>
    <div>
      Cart page
    </div>
  );
};

export default Cart;
