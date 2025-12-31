import React, { useState } from 'react';

const MessagesView = () => {
  const [messages] = useState([
    { id: 1, sender: 'Admin', subject: 'New Event Created', time: '2 hours ago', read: false },
    { id: 2, sender: 'System', subject: 'Event Reminder', time: '1 day ago', read: true },
    { id: 3, sender: 'John Doe', subject: 'Event RSVP', time: '3 days ago', read: true },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-red to-secondary-orange rounded-xl p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
          💬 Messages
        </h2>
        <p className="text-white text-opacity-90">{messages.length} total messages</p>
      </div>
      
      <div className="space-y-3">
        {messages.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300 shadow-sm">
            <div className="text-6xl mb-4 opacity-50">💬</div>
            <p className="text-gray-600 text-lg">No messages</p>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={`p-5 rounded-lg border-l-4 transition-all card-hover ${msg.read ? 'bg-white border-l-gray-300' : 'bg-secondary-orange-light border-l-secondary-orange shadow-md'}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className={`font-semibold text-gray-900 ${!msg.read ? 'text-secondary-orange-dark' : ''}`}>{msg.sender}</p>
                  <p className="text-gray-600 text-sm mt-1">{msg.subject}</p>
                </div>
                <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">{msg.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessagesView;
