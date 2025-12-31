import { useContext } from 'react';
import { EventContext } from '../context/EventContext';

/**
 * Custom hook to access events context
 * @returns {Object} Events context value
 */
const useEvents = () => {
  const context = useContext(EventContext);
  
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  
  return context;
};

export default useEvents;

