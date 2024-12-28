import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useNavigate } from "react-router-dom";
import { Heart, Eye } from "lucide-react";
import { toast } from "react-toastify";

let ProductCard = ({
  id,
  name,
  price,
  rating,
  reviews,
  image,
}) => {
  const { isLoggedIn, user } = useAuth();
  const { addToCart } = useCart();
  const { items, addToWishlist  } = useWishlist();
  const [inCart, setInCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  // Update wishlist state when items change or component mounts
  useEffect(() => {
    setIsWishlisted(items.some(item => item.id === id));
  }, [items, id]);

  const handleAddToCart = () => {
    if (user) {
      setInCart(true);
      if (inCart) {
        toast.error("Item already in cart!");
        return;
      }
      addToCart({ id, name, price, rating, reviews, image });
    } else {
      toast.error("Please login to add to cart");
      navigate("/login");
    }
  };

  const handleAddToWishlist = () => {
    if (user) {
      if(isWishlisted) {
        toast.error("Item already in wishlist!");
        return;
      }
      setIsWishlisted(true);
      addToWishlist({ id, name, price, rating, reviews, image });
      toast.success("Added to wishlist!");
    } else {
      toast.error("Please login to add to wishlist");
      navigate("/login");
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={`text-${index < rating ? "yellow" : "gray"}-400`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white p-4 rounded-lg relative group shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button
            className={`p-2 rounded-full transition-colors ${
              isWishlisted 
                ? "bg-red-500 text-white hover:bg-red-600" 
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={handleAddToWishlist}
          >
            <Heart
              className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
            />
          </button>
          <button
            className="p-2 bg-white rounded-full hover:bg-gray-100"
            onClick={() => {navigate(`/products/${id}`)}}
            aria-label="Quick view"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className={`w-full py-2 rounded transition-colors ${
              inCart
                ? "bg-green-500 text-white"
                : "bg-black text-white hover:bg-gray-800"
            }`}
            onClick={handleAddToCart}
          >
            {inCart ? "In Cart" : "Add To Cart"}
          </button>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2 truncate px-2" title={name}>
        {name}
      </h3>
      <div className="flex justify-between items-center px-2">
        <div className="mb-2">
          <span className="text-red-500 font-semibold">
            ${price.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">{renderStars(rating)}</div>
            <span className="text-gray-500 text-sm">({reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
