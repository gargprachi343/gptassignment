import React from 'react';
import useEvents from '../../hooks/useEvents';

const HistoryView = () => {
  const { events } = useEvents();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const pastEvents = events.filter(e => new Date(e.date) < today);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-red to-secondary-orange rounded-xl p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
          🕐 History
        </h2>
        <p className="text-white text-opacity-90">{pastEvents.length} past events</p>
      </div>
      
      {pastEvents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300 shadow-sm">
          <div className="text-6xl mb-4 opacity-50">🕐</div>
          <p className="text-gray-600 text-lg">No past events</p>
          <p className="text-gray-500 text-sm mt-2">Events you attended will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pastEvents.map(event => (
            <div key={event.id} className="bg-white p-6 rounded-lg border border-gray-200 card-hover shadow-sm">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{event.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  <div className="flex gap-4 mt-3 text-sm text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1">📍 {event.location}</span>
                    <span className="flex items-center gap-1">📅 {new Date(event.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <span className="px-4 py-2 bg-gradient-to-r from-primary-red to-secondary-orange text-white rounded-full text-xs font-semibold whitespace-nowrap">Past Event</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
