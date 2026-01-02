export const getUpcomingEventsCount = (events) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return events.filter(e => new Date(e.date) >= today).length;
};

export const getPastEventsCount = (events) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return events.filter(e => new Date(e.date) < today).length;
};

export const getThisMonthEventsCount = (events) => {
  const now = new Date();
  return events.filter(e => {
    const eventDate = new Date(e.date);
    return eventDate.getMonth() === now.getMonth() && 
           eventDate.getFullYear() === now.getFullYear();
  }).length;
};

export const getCategoryCount = (events, category) => {
  return events.filter(e => e.category === category).length;
};
