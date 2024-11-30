import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Minus, Plus, X, ShoppingCart, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { user } = useAuth();
  const { 
    items, 
    total, 
    subtotal, 
    shipping, 
    discount, 
    appliedCoupon,
    removeFromCart, 
    clearCart,
    updateQuantity, 
    applyCoupon,
    removeCoupon 
  } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen justify-center mt-24">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 ">You need to login to view your cart</p>
          <button className='inline-flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-400 mt-4 transition-colors' onClick={() => navigate('/login')}>Login</button>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-semibold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-4">Add some items to your cart to get started</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (item, change) => {
    const newQuantity = (item.quantity || 1) + change;
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemoveItem = (product) => {
    removeFromCart(product);
  };

  const handleClearCart = () => {
    let confirmation = confirm('Are you sure you want to clear the cart?')
      if(confirmation) {
        toast.error('Cart cleared !');
        clearCart();
      }else {
        toast.dismiss();
      }
  }
  

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode.trim());
      setCouponCode('');
    }
  };

  const calculateItemTotal = (item) => {
    return (item.price * (item.quantity || 1)).toFixed(2);
  };

  return (
    <div className="container mx-auto p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-gray-600 mb-8">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="font-medium">Cart</span>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-6 py-4">Product</th>
                  <th className="text-left px-6 py-4">Price</th>
                  <th className="text-left px-6 py-4">Quantity</th>
                  <th className="text-left px-6 py-4">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id} className="border-t">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <button 
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                            onClick={() => handleRemoveItem(item)}
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded"
                          />
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center border rounded-lg w-32">
                        <button 
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                          onClick={() => handleQuantityChange(item, -1)}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="flex-1 text-center border-x px-3 py-1">
                          {item.quantity || 1}
                        </span>
                        <button 
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                          onClick={() => handleQuantityChange(item, 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      ${calculateItemTotal(item)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center w-full mt-10">
          <div className="flex justify-between">
            <Link 
              to="/"
              className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
          <button className='flex justify-between items-center px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors' onClick={handleClearCart}>

            <span>Clear cart</span>
          </button>
          </div>
        </div>

        {/* Cart Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Cart Summary</h2>
            
            {/* Coupon Section */}
            <form onSubmit={handleCouponSubmit} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Apply
                </button>
              </div>
            </form>

            {/* Applied Coupon */}
            {appliedCoupon && (
              <div className="flex justify-between items-center mb-6 p-3 bg-green-50 rounded-lg">
                <span className="text-green-600">
                  Coupon applied: {appliedCoupon.code}
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Total Calculations */}
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between py-3 border-b text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between py-3 text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <button className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                <Link to="/checkout">Proceed to Checkout</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;








  