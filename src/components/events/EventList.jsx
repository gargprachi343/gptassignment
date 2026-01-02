import React from 'react';
import EventCard from './EventCard';
import Loader from '../common/Loader';
import EmptyState from '../common/EmptyState';

const EventList = ({ events, loading, onDelete, onToggleFavorite }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12" role="status" aria-live="polite">
        <Loader size="lg" />
      </div>
    );
  }

  if (events.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
      role="list"
      aria-label="Events list"
    >
      {events.map((event) => (
        <EventCard 
          key={event.id} 
          event={event} 
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
          isFavorite={event.isFavorite}
        />
      ))}
    </div>
  );
};

export default EventList;

