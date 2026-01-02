import React from 'react';
import useEvents from '../../hooks/useEvents';
import EventCard from '../events/EventCard';

const FavoritesView = () => {
  const { events, toggleFavorite, deleteEvent } = useEvents();
  const favorites = events.filter(e => e.isFavorite);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-red to-secondary-orange rounded-xl p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
          ⭐ Favorites
        </h2>
        <p className="text-white text-opacity-90">Your saved favorite events - {favorites.length} total</p>
      </div>
      
      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300 shadow-sm">
          <div className="text-6xl mb-4 opacity-50">⭐</div>
          <p className="text-gray-600 text-xl font-medium">No favorite events yet</p>
          <p className="text-gray-500 text-sm mt-2">Click the star icon on events to save them here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onDelete={deleteEvent}
              onToggleFavorite={toggleFavorite}
              isFavorite={event.isFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesView;
