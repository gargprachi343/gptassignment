import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { formatDate, isPastDate } from '../../utils/dateUtils';
import Button from '../common/Button';

/**
 * Event card component displaying event information
 */
const EventCard = ({ event, onDelete }) => {
  const { isAdmin } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(event.id);
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const eventDate = new Date(event.date);
  const isPast = isPastDate(eventDate);

  const categoryColors = {
    Workshop: 'bg-primary-red-light text-primary-red',
    Talk: 'bg-secondary-orange-light text-secondary-orange-dark',
    Campaign: 'bg-accent-peach text-secondary-orange-dark',
  };

  return (
    <article
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-200 hover:border-secondary-orange-light cursor-pointer"
      role="listitem"
      onClick={() => {
        // Event detail view can be added here
        console.log('Event clicked:', event);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          console.log('Event clicked:', event);
        }
      }}
      tabIndex={0}
      aria-label={`Event: ${event.title}`}
    >
      <div className="flex justify-between items-start mb-2 sm:mb-3">
        <h3
          className="text-base sm:text-lg font-semibold text-gray-900 flex-1 break-words line-clamp-2"
          title={event.title}
        >
          {event.title}
        </h3>
        {isAdmin && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            disabled={isDeleting}
            className="ml-2 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1 disabled:opacity-50 transition-colors"
            aria-label={`Delete event: ${event.title}`}
            title="Delete event"
          >
            {isDeleting ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        )}
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <time dateTime={event.date} className={isPast ? 'text-gray-500' : ''}>
            {formatDate(event.date)}
            {isPast && <span className="ml-2 text-xs text-gray-400">(Past)</span>}
          </time>
        </div>

        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="break-words">{event.location}</span>
        </div>

        <div className="flex items-center">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[event.category] || 'bg-gray-100 text-gray-700'}`}>
            {event.category}
          </span>
        </div>
      </div>
    </article>
  );
};

export default EventCard;

