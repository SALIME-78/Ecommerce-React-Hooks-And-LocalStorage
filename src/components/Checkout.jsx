import React, { useState } from 'react';

const CartComponent = () => {
  const [cartItems, setCartItems] = useState([{}]);

  const updateQuantity = (id, quantity) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = 20; // Fixed shipping cost
    return subtotal + shipping;
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="mb-5 text-gray-600 text-sm">Home / Cart</div>

      <table className="w-full border-collapse mb-7">
        <thead>
          <tr>
            <th className="bg-gray-200 p-4 text-left font-semibold">Product</th>
            <th className="bg-gray-200 p-4 text-left font-semibold">Price</th>
            <th className="bg-gray-200 p-4 text-left font-semibold">Quantity</th>
            <th className="bg-gray-200 p-4 text-left font-semibold">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td className="p-4">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
                  <span>{item.name}</span>
                </div>
              </td>
              <td className="p-4">${item.price}</td>
              <td className="p-4">
                <select
                  className="w-20 p-2 border border-gray-300 rounded"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                >
                  {[...Array(10).keys()].map(n => (
                    <option key={n} value={n + 1}>{n + 1}</option>
                  ))}
                </select>
              </td>
              <td className="p-4">${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mb-7">
        <button className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded">Return To Shop</button>
        <button className="bg-red-600 text-white font-semibold py-3 px-6 rounded">Update Cart</button>
      </div>

      <div className="bg-gray-200 p-5 rounded w-80 ml-auto">
        <h3 className="font-semibold">Cart Total</h3>
        <div className="mb-4">
          <p>Subtotal: ${calculateSubtotal()}</p>
          <p>Shipping: $20</p>
          <h4 className="font-bold">Total: ${calculateTotal()}</h4>
        </div>
        <button className="bg-red-600 text-white font-semibold py-3 px-6 rounded w-full">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartComponent;
