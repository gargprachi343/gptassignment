import React, { createContext, useState, useEffect, useCallback } from 'react';
import useAuth from '../hooks/useAuth';
import { eventsService } from '../services/eventsService';
import mongoService from '../services/mongoService';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const { sessionId, isAuthenticated } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    timeFilter: 'all',
  });

  // Fetch events
  const fetchEvents = useCallback(async () => {
    if (!isAuthenticated || !sessionId) {
      setEvents([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Try to fetch from MongoDB first
      const mongoEvents = await mongoService.getEvents(filters);
      if (mongoEvents && mongoEvents.length > 0) {
        setEvents(mongoEvents);
      } else {
        // Fallback to eventsService
        const data = await eventsService.getEvents(sessionId, filters);
        setEvents(data);
      }
    } catch (err) {
      // Fallback to eventsService if MongoDB fails
      try {
        const data = await eventsService.getEvents(sessionId, filters);
        setEvents(data);
      } catch (fallbackErr) {
        setError(err.message || 'Failed to fetch events');
        setEvents([]);
      }
    } finally {
      setLoading(false);
    }
  }, [sessionId, isAuthenticated, filters]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Failed to parse favorites:', e);
        // Set default favorites if localStorage is empty
        setFavorites(['1', '2']);
      }
    } else {
      // Initialize with default favorites so it's not empty
      setFavorites(['1', '2']);
      localStorage.setItem('favorites', JSON.stringify(['1', '2']));
    }
  }, []);

  // Fetch events when filters or authentication changes
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Create event
  const createEvent = async (eventData) => {
    if (!sessionId) {
      throw new Error('Not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      // Create in MongoDB first, fallback to eventsService
      let newEvent;
      try {
        newEvent = await mongoService.createEvent(eventData);
      } catch (mongoErr) {
        console.warn('MongoDB create failed, using eventsService:', mongoErr);
        newEvent = await eventsService.createEvent(sessionId, eventData);
      }
      
      // Refresh events list
      await fetchEvents();
      return { success: true, event: newEvent };
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to create event';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Delete event
  const deleteEvent = async (eventId) => {
    if (!sessionId) {
      throw new Error('Not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      // Delete from MongoDB first, fallback to eventsService
      try {
        await mongoService.deleteEvent(eventId);
      } catch (mongoErr) {
        console.warn('MongoDB delete failed, using eventsService:', mongoErr);
        await eventsService.deleteEvent(sessionId, eventId);
      }
      
      // Refresh events list
      await fetchEvents();
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to delete event';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Toggle event as favorite
  const toggleFavorite = async (eventId) => {
    try {
      const isFavorited = favorites.includes(eventId);
      let updatedFavorites;
      
      if (isFavorited) {
        // Remove from favorites
        updatedFavorites = favorites.filter(id => id !== eventId);
      } else {
        // Add to favorites
        updatedFavorites = [...favorites, eventId];
      }
      
      // Update state and localStorage
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      
      return { success: true };
    } catch (err) {
      const errorMessage = err.message || 'Failed to toggle favorite';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Check if event is favorite
  const isFavorite = (eventId) => favorites.includes(eventId);

  const value = {
    events: events.map(event => ({
      ...event,
      isFavorite: isFavorite(event.id)
    })),
    loading,
    error,
    filters,
    favorites,
    fetchEvents,
    createEvent,
    deleteEvent,
    toggleFavorite,
    updateFilters,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

