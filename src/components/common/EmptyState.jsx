import React from 'react';

/**
 * Empty state component for when no events are found
 */
const EmptyState = ({ message = 'No events found.', subMessage = 'Try adjusting your filters or check back later.' }) => {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200" role="status">
      <div className="mx-auto w-24 h-24 mb-4 rounded-full bg-secondary-orange-light flex items-center justify-center">
        <svg
          className="w-12 h-12 text-secondary-orange"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <p className="text-gray-600 text-lg font-medium">{message}</p>
      <p className="text-sm text-gray-500 mt-2">{subMessage}</p>
    </div>
  );
};

export default EmptyState;

