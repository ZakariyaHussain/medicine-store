import { createContext, useContext, useState } from 'react';
//import toast from 'react-hot-toast';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (medicine) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === medicine._id);
      if (exists) {
        //toast.success(`${medicine.itemName} quantity increased`);
        return prev.map((item) =>
          item._id === medicine._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        //toast.success(`${medicine.itemName} added to cart`);
        return [...prev, { ...medicine, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(item.quantity + amount, 1) }
          : item
      )
    );
  };
  
//   const cartInfo = {
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity

//     }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
