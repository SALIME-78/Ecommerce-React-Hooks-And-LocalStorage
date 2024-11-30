import React from 'react';

export default function ProductSort({ sortBy, onSortChange }) {
  return (
    <div className="flex items-center gap-2">
      {/* <ArrowUpDown className="w-5 h-5 text-gray-500" /> */}
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
      >
        <option value="relevant" className='p-2'>Most Relevant</option>
        <option value="price-asc"  className='p-2'>Price: Low to High</option>
        <option value="price-desc"   className='p-2'>Price: High to Low</option>
        <option value="rating-desc">Highest Rated</option>
        <option value="name-asc" className='p-2'>Name: A to Z</option>
      </select>
    </div>
  );
}