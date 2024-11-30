import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { Heart, Truck, RotateCcw } from "lucide-react";

const ProductDetails = () => {
  const { id = "" } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const navigate = useNavigate();

  const product = products.find((product) => product.id === parseInt(id));

  // Handle quantity changes
  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600">Unable to load product details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Gallery */}
        <div className="md:w-1/2">
          <div className="flex">
            <div className="flex flex-col gap-3 w-1/4">
              <img
                src={product.image}
                alt={product.name}
                className="w-[95%] h-1/2 object-cover"
              />
              <img
                src={product.image}
                alt={product.name}
                className="w-[95%] h-1/2 object-cover"
              />
              <img
                src={product.image}
                alt={product.name}
                className="w-[95%] h-1/2 object-cover"
              />
              <img
                src={product.image}
                alt={product.name}
                className="w-[95%] h-1/2 object-cover"
              />
            </div>
            <div className="w-full ml-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="text-gray-500">({product.reviews} reviews)</span>
            <span className="text-green-500 ml-2">In Stock</span>
          </div>

          <p className="text-2xl font-bold text-red-500 mt-2">
            ${product.price}
          </p>
          <p className="mt-2 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Color Options */}
          <div className="mt-2">
            <h3 className="font-semibold mb-2">Colors:</h3>
            <div className="flex space-x-2">
              {["blue", "red"].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-5 h-5 rounded-full bg-${color}-500 ${
                    selectedColor === color
                      ? "ring-2 ring-offset-2 ring-red-500"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Size Options */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Size:</h3>
            <div className="flex space-x-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size
                      ? "border-red-500 text-red-500"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Buy Button */}
          <div className="w-2/3 mt-6 flex items-center space-x-4">
            <div className="flex items-center border rounded-md py-1">
              <button
                onClick={() => handleQuantityChange("decrement")}
                className="px-4 py-2 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increment")}
                className="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button className="w-3/4 bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-600 transition-colors">
              Add to Cart
            </button>
            <button
              // onClick={navigate('/wishlist')}
              className={`w-1/2 flex items-center justify-center py-3 border rounded-md"border-red-500 text-red-500"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
            >
              <Heart />
            </button>
          </div>

          {/* Product Features */}
          <div className="mt-8">
            <div className="flex">
              <div className="max-w-md w-full border border-gray-200 rounded-sm">
                <div className="p-4 flex items-start gap-4 border-b border-gray-200">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Truck className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Free Delivery</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Enter your postal code for Delivery Availability
                    </p>
                  </div>
                </div>

                <div className="p-4 flex items-start gap-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <RotateCcw className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Return Delivery
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Free 30 Days Delivery Returns. Details
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="group">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
