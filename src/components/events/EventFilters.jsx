import React from 'react';
import { CATEGORIES, TIME_FILTERS } from '../../utils/constants';

/**
 * Event filters component for category and time filtering
 */
const EventFilters = ({ filters, onFilterChange }) => {
  const handleCategoryChange = (e) => {
    onFilterChange({ category: e.target.value });
  };

  const handleTimeFilterChange = (e) => {
    onFilterChange({ timeFilter: e.target.value });
  };

  const handleClearAll = () => {
    onFilterChange({ category: 'all', timeFilter: 'all' });
  };

  return (
    <div className="mb-4 sm:mb-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Filters</h3>
        <button 
          onClick={handleClearAll}
          className="text-xs sm:text-sm text-secondary-orange hover:text-secondary-orange-dark font-medium transition-colors self-start sm:self-auto"
          aria-label="Clear all filters"
        >
          Clear All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category-filter"
            value={filters.category || 'all'}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-orange"
            aria-label="Filter events by category"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="time-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Time
          </label>
          <select
            id="time-filter"
            value={filters.timeFilter || 'all'}
            onChange={handleTimeFilterChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-orange"
            aria-label="Filter events by time"
          >
            <option value={TIME_FILTERS.ALL}>All Events</option>
            <option value={TIME_FILTERS.UPCOMING}>Upcoming</option>
            <option value={TIME_FILTERS.PAST}>Past</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default EventFilters;

