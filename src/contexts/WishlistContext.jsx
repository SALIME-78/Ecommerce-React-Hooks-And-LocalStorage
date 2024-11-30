import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

// Action types
const ACTIONS = {
  LOAD_WISHLIST: 'LOAD_WISHLIST',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_ITEMS: 'CLEAR_ITEMS',
};

// Initial state with empty array
const initialState = {
  items: [],
};

// Reducer function
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_WISHLIST:
      return {
        items: action.payload || [],
      };
    case ACTIONS.ADD_ITEM:
      if (state.items.some(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        items: [...state.items, action.payload],
      };
    case ACTIONS.REMOVE_ITEM:
      return {
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    case ACTIONS.CLEAR_ITEMS:
      return initialState;
    default:
      return state;
  }
};

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Load wishlist when user changes
  useEffect(() => {
    if (user) {
      const savedWishlist = localStorage.getItem(`wishlist_${user.id}`);
      if (savedWishlist) {
        try {
          const parsedWishlist = JSON.parse(savedWishlist);
          dispatch({ 
            type: ACTIONS.LOAD_WISHLIST, 
            payload: parsedWishlist.items 
          });
        } catch (error) {
          console.error('Error loading wishlist:', error);
          dispatch({ type: ACTIONS.LOAD_WISHLIST, payload: [] });
        }
      }
    } else {
      dispatch({ type: ACTIONS.LOAD_WISHLIST, payload: [] });
    }
  }, [user]);

  // Save wishlist whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(state));
    }
  }, [state, user]);

  const addToWishlist = (product) => {
    if (!user) return;
    dispatch({ type: ACTIONS.ADD_ITEM, payload: product });
  };

  const removeFromWishlist = (product) => {
    if (!user) return;
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: product });
  };

  const clearWishlist = () => {
    if (!user) return;
    dispatch({ type: ACTIONS.CLEAR_ITEMS });
  };

  return (
    <WishlistContext.Provider value={{
      items: state.items,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
