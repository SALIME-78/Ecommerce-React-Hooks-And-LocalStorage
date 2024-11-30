import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import products from "../data/products";
import ProductFilters from "../components/ProductFilters";
import ProductSort from "../components/ProductSort";
import ProductCard from "../components/ProductCard";

function AllProducts() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("relevant");

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category)));
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) =>
        product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
      .filter((product) =>
        selectedCategory ? product.category === selectedCategory : true
      )
      .filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      )
      .filter((product) => product.rating >= minRating)
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "rating-desc":
            return b.rating - a.rating;
          case "name-asc":
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [searchTerm, selectedCategory, priceRange, minRating, sortBy]);

  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 1000]);
    setMinRating(0);
    setSortBy("relevant");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductFilters
              categories={categories}
              selectedCategory={selectedCategory}
              priceRange={priceRange}
              minRating={minRating}
              onCategoryChange={setSelectedCategory}
              onPriceRangeChange={setPriceRange}
              onMinRatingChange={setMinRating}
              onClearFilters={clearFilters}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredProducts.length} products found
              </p>
              <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  No products found
                </h2>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div className="w-full p-4" key={product.id}>
                    <div key={product.id} className="flex-shrink-0 w-[280px]">
      <ProductCard {...product} />
    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
