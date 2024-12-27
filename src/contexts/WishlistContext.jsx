import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';

const WishlistContext = createContext();

const initialState = {
  items: []
};

const loadWishlistFromStorage = (userId) => {
  try {
    const savedWishlist = localStorage.getItem(`wishlist_${userId}`);
    if (savedWishlist) {
      const parsedWishlist = JSON.parse(savedWishlist);
      return {
        ...initialState,
        items: parsedWishlist.items || []
      };
    }
  } catch (error) {
    console.error('Error loading wishlist:', error);
  }
  return initialState;
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state; // Item already exists in wishlist
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }

    case 'REMOVE_FROM_WISHLIST': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };
    }

    case 'CLEAR_WISHLIST':
      return initialState;

    default:
      return state;
  }
};

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Load wishlist from localStorage when component mounts or user changes
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.id) {
      const savedState = loadWishlistFromStorage(user.id);
      if (savedState.items.length > 0) {
        dispatch({ type: 'CLEAR_WISHLIST' });
        savedState.items.forEach(item => {
          dispatch({ type: 'ADD_TO_WISHLIST', payload: item });
        });
      }
    } else {
      dispatch({ type: 'CLEAR_WISHLIST' });
    }
  }, [user]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.id) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(state));
    }
  }, [state, user]);

  const addToWishlist = (product) => {
    if (!user) {
      toast.error('Please login to add items to wishlist');
      return;
    }
    if (!product) return;

    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem) {
      toast.error('Item already in wishlist');
      return;
    }

    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    toast.success('Item added to wishlist');
  };

  const removeFromWishlist = (product) => {
    if (!user) {
      toast.error('Please login to remove items from wishlist');
      return;
    }
    if (!product) return;
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product });
    toast.success('Item removed from wishlist');
  };

  const clearWishlist = () => {
    if (!user) {
      toast.error('Please login to clear wishlist');
      return;
    }
    dispatch({ type: 'CLEAR_WISHLIST' });
    toast.success('Wishlist cleared');
  };

  const isInWishlist = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        items: state.items,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
