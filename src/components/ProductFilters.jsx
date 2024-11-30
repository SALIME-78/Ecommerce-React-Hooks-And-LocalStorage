import React, { useState } from 'react';
import { SlidersHorizontal, X, ArrowRight } from 'lucide-react';

export default function ProductFilters({
  categories,
  selectedCategory,
  priceRange,
  minRating,
  onCategoryChange,
  onPriceRangeChange,
  onMinRatingChange,
  onClearFilters,
}) {
  
  const [tempMinPrice, setTempMinPrice] = useState('Min');
  const [tempMaxPrice, setTempMaxPrice] = useState('Max');

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    onPriceRangeChange([Number(tempMinPrice), Number(tempMaxPrice)]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePriceSubmit(e);

    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          <h3 className="font-semibold">Filters</h3>
        </div>
        <button
          onClick={onClearFilters} 
          className="text-sm text-gray-500 flex items-center gap-1 hover:text-gray-700"
        >
          <X className="w-4 h-4" />
          Clear
        </button>
      </div>

      <div className="space-y-4">
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            key={selectedCategory}
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          >
            <option value="" className='p-2'>All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <form onSubmit={handlePriceSubmit} className="flex gap-2">
            <input
              type="number"
              value={tempMinPrice}
              onChange={(e) => setTempMinPrice(e.target.value)}
              onKeyUp={handleKeyPress}
              className="w-1/2 rounded-md bg-gray-100 border-gray-50 shadow-sm focus:border-gray-50 focus:ring-gray-50 outline-gray-200 pl-2"
              placeholder="Min"
            />
            <input
              type="number"
              value={tempMaxPrice}
              onChange={(e) => setTempMaxPrice(e.target.value)}
              onKeyUp={handleKeyPress}
              className="w-1/2 rounded-md bg-gray-100 border-gray-50 shadow-sm focus:border-gray-50 focus:ring-gray-50 outline-gray-200 pl-2"
              placeholder="Max"
            />
            <button
    type="submit"
    className="rounded-full p-2 text-gray-500 hover:text-gray-700 hover:bg-indigo-50 transition-colors"
  >
    <ArrowRight className="w-4 h-4" />
  </button>
          </form>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Rating
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.2"
            value={minRating}
            onChange={(e) => onMinRatingChange(Number(e.target.value))}
          className="w-full"
          />
          <div className="text-sm text-gray-500 text-center">{minRating} stars</div>
        </div>
      </div>
    </div>
  );
}