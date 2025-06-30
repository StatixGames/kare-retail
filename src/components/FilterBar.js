// src/components/FilterBar.js
import React from 'react';

export const FilterBar = ({ products, filters, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <select 
        value={filters.product}
        onChange={(e) => onFilterChange('product', e.target.value)}
        className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
      >
        <option value="all">All Products</option>
        {products.map(product => (
          <option key={product} value={product}>
            {product}
          </option>
        ))}
      </select>
      
      {/* Category filter - will be functional when we add categories */}
      <select 
        value={filters.category}
        onChange={(e) => onFilterChange('category', e.target.value)}
        className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        disabled
      >
        <option value="all">All Categories</option>
        <option value="quality">Quality Issues</option>
        <option value="delivery">Delivery Problems</option>
        <option value="service">Customer Service</option>
      </select>
      
      {/* Time frame filter */}
      <select 
        value={filters.timeFrame}
        onChange={(e) => onFilterChange('timeFrame', e.target.value)}
        className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        disabled
      >
        <option value="all">All Time</option>
        <option value="week">Last 7 Days</option>
        <option value="month">Last 30 Days</option>
      </select>
    </div>
  );
};