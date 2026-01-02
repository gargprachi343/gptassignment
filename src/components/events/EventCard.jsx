import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import { formatDate, isPastDate } from '../../utils/dateUtils';
import Icon from '../common/Icon';

const EventCard = ({ event, onDelete, onToggleFavorite, isFavorite }) => {
  const { isAdmin } = useAuth();
  const { isDarkMode } = useTheme();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

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

  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
    setIsTogglingFavorite(true);
    try {
      await onToggleFavorite(event.id);
    } catch (error) {
      console.error('Toggle favorite error:', error);
    } finally {
      setIsTogglingFavorite(false);
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
      className={`rounded-xl shadow-sm border p-4 sm:p-6 hover:shadow-lg transition-all duration-200 cursor-pointer ${
        isDarkMode
          ? 'bg-gray-800 border-gray-700 hover:border-primary-red-light'
          : 'bg-white border-gray-200 hover:border-secondary-orange-light'
      }`}
      role="listitem"
      onClick={() => {
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
          className={`text-base sm:text-lg font-semibold flex-1 break-words line-clamp-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
          title={event.title}
        >
          {event.title}
        </h3>
        <div className="flex gap-1 ml-2">
          <button
            onClick={handleToggleFavorite}
            disabled={isTogglingFavorite}
            className={`focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded p-1 disabled:opacity-50 transition-colors ${
              isDarkMode
                ? isFavorite ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-300'
                : isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
            }`}
            aria-label={`${isFavorite ? 'Remove from' : 'Add to'} favorites: ${event.title}`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isTogglingFavorite ? (
              <Icon name="loading" className="w-5 h-5" />
            ) : (
              <span className="text-lg">{isFavorite ? '⭐' : '☆'}</span>
            )}
          </button>
          {isAdmin && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              disabled={isDeleting}
              className={`focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1 disabled:opacity-50 transition-colors ${
                isDarkMode
                  ? 'text-red-400 hover:text-red-300'
                  : 'text-red-600 hover:text-red-800'
              }`}
              aria-label={`Delete event: ${event.title}`}
              title="Delete event"
            >
              {isDeleting ? (
                <Icon name="loading" className="w-5 h-5" />
              ) : (
                <Icon name="delete" className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>

      <div className={`space-y-2 text-sm ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <div className="flex items-center">
          <Icon name="calendar" className="w-4 h-4 mr-2 text-gray-400" />
          <time dateTime={event.date} className={isPast ? 'text-gray-500' : ''}>
            {formatDate(event.date)}
            {isPast && <span className="ml-2 text-xs text-gray-400">(Past)</span>}
          </time>
        </div>

        <div className="flex items-center">
          <Icon name="location" className="w-4 h-4 mr-2 text-gray-400" />
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

