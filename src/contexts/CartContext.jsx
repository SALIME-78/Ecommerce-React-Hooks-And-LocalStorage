import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { coupons } from '../data/coupons';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
  subtotal: 0,
  shipping: 10,
  appliedCoupon: null,
  discount: 0
};

const calculateSubtotal = (items) => {
  return items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
};

const calculateTotal = (subtotal, shipping, discount) => {
  return Math.max(0, (subtotal || 0) + (shipping || 0) - (discount || 0));
};

const loadCartFromStorage = (userId) => {
  try {
    const savedCart = localStorage.getItem(`cart_${userId}`);
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      return {
        ...initialState,
        ...parsedCart,
        items: parsedCart.items || [],
        subtotal: calculateSubtotal(parsedCart.items || []),
        total: calculateTotal(
          calculateSubtotal(parsedCart.items || []),
          parsedCart.shipping || initialState.shipping,
          parsedCart.discount || 0
        )
      };
    }
  } catch (error) {
    console.error('Error loading cart:', error);
  }
  return initialState;
};

const cartReducer = (state, action) => {
  console.log(state)
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      const updatedItems = existingItem
        ? state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          )
        : [...state.items, { ...action.payload, quantity: 1 }];
      
      const subtotal = calculateSubtotal(updatedItems);
      const discount = state.appliedCoupon 
        ? state.appliedCoupon.discount >= 1 
          ? state.appliedCoupon.discount 
          : subtotal * (state.appliedCoupon.discount / 100)
        : 0;
      return {
        ...state,
        items: updatedItems,
        subtotal,
        total: calculateTotal(subtotal, state.shipping, discount),
        discount
      };
    }

    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.id !== action.payload.id);
      const subtotal = calculateSubtotal(updatedItems);
      const discount = state.appliedCoupon 
        ? state.appliedCoupon.discount >= 1 
          ? state.appliedCoupon.discount 
          : subtotal * (state.appliedCoupon.discount / 100)
        : 0;

      return {
        ...state,
        items: updatedItems,
        subtotal,
        total: calculateTotal(subtotal, state.shipping, discount),
        discount
      };
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const subtotal = calculateSubtotal(updatedItems);
      const discount = state.appliedCoupon 
        ? state.appliedCoupon.discount >= 1 
          ? state.appliedCoupon.discount 
          : subtotal * (state.appliedCoupon.discount / 100)
        : 0;

      return {
        ...state,
        items: updatedItems,
        subtotal,
        total: calculateTotal(subtotal, state.shipping, discount),
        discount
      };
    }

    case 'APPLY_COUPON': {
      const coupon = coupons.find(c => c.code === action.payload);
      if (!coupon) return state;

      const discount = coupon.discount >= 1 
        ? coupon.discount 
        : state.subtotal * (coupon.discount / 100);

      return {
        ...state,
        appliedCoupon: coupon,
        discount,
        total: calculateTotal(state.subtotal, state.shipping, discount)
      };
    }

    case 'REMOVE_COUPON': {
      return {
        ...state,
        appliedCoupon: null,
        discount: 0,
        total: calculateTotal(state.subtotal, state.shipping, 0)
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage when component mounts or user changes
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.id) {
      const savedState = loadCartFromStorage(user.id);
      if (savedState.items.length > 0) {
        dispatch({ type: 'CLEAR_CART' });
        savedState.items.forEach(item => {
          dispatch({ type: 'ADD_TO_CART', payload: item });
        });
        if (savedState.appliedCoupon) {
          dispatch({ type: 'APPLY_COUPON', payload: savedState.appliedCoupon.code });
        }
      }
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.id) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(state));
    }
  }, [state, user]);

  const addToCart = async(product) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    if (!product) return;
    else {
      const cart = localStorage.getItem(`cart_${user.id}`);
      if (cart) {
        const parsedCart = await JSON.parse(cart);
        parsedCart.items.push(product);
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(parsedCart));
      }
      dispatch({ type: 'ADD_TO_CART', payload: product });

    }
    toast.success('Item added to cart');
  };

  const removeFromCart = (product) => {
    if (!user) {
      toast.error('Please login to remove items from cart');
      return;
    }
    if (!product) return;
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
    toast.success('Item removed from cart');
  };

  const updateQuantity = (productId, quantity) => {
    if (!user) {
      toast.error('Please login to update cart');
      return;
    }
    if (!productId || quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const applyCoupon = (code) => {
    if (!user) {
      toast.error('Please login to apply coupon');
      return false;
    }
    if (!code) return false;
    const coupon = coupons.find(c => c.code === code);
    if (!coupon) {
      toast.error('Invalid coupon code');
      return false;
    }
    dispatch({ type: 'APPLY_COUPON', payload: code });
    toast.success('Coupon applied successfully');
    return true;
  };

  const removeCoupon = () => {
    if (!user) {
      toast.error('Please login to remove coupon');
      return;
    }
    dispatch({ type: 'REMOVE_COUPON' });
    toast.success('Coupon removed');
  };

  const clearCart = () => {
    if (!user) {
      toast.error('Please login to clear cart');
      return;
    }
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared');
  };

  return (
    <CartContext.Provider 
      value={{ 
        ...state, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        applyCoupon,
        removeCoupon,
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}