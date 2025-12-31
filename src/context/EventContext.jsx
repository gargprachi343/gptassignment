import React, { createContext, useState, useEffect, useCallback } from 'react';
import useAuth from '../hooks/useAuth';
import { eventsService } from '../services/eventsService';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const { sessionId, isAuthenticated } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
      const data = await eventsService.getEvents(sessionId, filters);
      setEvents(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [sessionId, isAuthenticated, filters]);

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
      const newEvent = await eventsService.createEvent(sessionId, eventData);
      
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
      await eventsService.deleteEvent(sessionId, eventId);
      
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

  const value = {
    events,
    loading,
    error,
    filters,
    fetchEvents,
    createEvent,
    deleteEvent,
    updateFilters,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

