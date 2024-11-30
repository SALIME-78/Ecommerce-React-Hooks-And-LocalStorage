import { useWishlist } from "../contexts/WishlistContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl text-gray-400 mb-4">
            Login to view your wishlist
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-400"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Start adding items to your wishlist to keep track of products you love!
          </p>
          <button
            onClick={() => navigate("/allproducts")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-sm shadow-sm text-white text-bold bg-red-500 hover:bg-red-600"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item);
    toast.success("Item moved to cart!");
  };

  const handleRemoveFromWishlist = (item) => {
    removeFromWishlist(item);
    toast.success("Item removed from wishlist!");
  };

  const handleClearWishlist = () => {
    clearWishlist();
    toast.success("Wishlist cleared!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">My Wishlist</h2>
          {items.length > 0 && (
            <button
              onClick={handleClearWishlist}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Clear Wishlist
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => handleRemoveFromWishlist(item)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                    aria-label="Move to cart"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <h3 className="font-semibold mb-2 truncate" title={item.name}>
                {item.name}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-red-500 font-semibold">
                  ${item.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span
                        key={index}
                        className={`text-${
                          index < item.rating ? "yellow" : "gray"
                        }-400`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">({item.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;