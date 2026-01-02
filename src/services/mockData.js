/**
 * Mock Data Service
 * Contains all hardcoded data for the application when backend is not available
 */

// Mock Users Database
const mockUsers = [
  {
    id: '1',
    name: 'Prachi Garg',
    email: 'prachi.garg@example.com',
    password: 'password123',
    role: 'user',
    isActive: true,
    createdAt: new Date('2025-12-01'),
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    isActive: true,
    createdAt: new Date('2025-12-01'),
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'test123',
    role: 'user',
    isActive: true,
    createdAt: new Date('2025-11-15'),
  },
];

// Mock Events Database
const mockEvents = [
  {
    id: '1',
    title: 'React Workshop: Building Modern UIs',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    location: 'Tech Hub, Room 101',
    category: 'Workshop',
    description: 'Learn advanced React patterns and hooks',
    organizer: 'Prachi Garg',
    capacity: 50,
    registered: 32,
  },
  {
    id: '2',
    title: 'Keynote: The Future of Web Development',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    location: 'Main Auditorium',
    category: 'Talk',
    description: 'Industry experts discuss the future of web technologies',
    organizer: 'Admin User',
    capacity: 200,
    registered: 156,
  },
  {
    id: '3',
    title: 'Community Outreach Campaign',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    location: 'Community Center',
    category: 'Campaign',
    description: 'Join us in making a difference in the community',
    organizer: 'John Doe',
    capacity: 100,
    registered: 45,
  },
  {
    id: '4',
    title: 'Past Event: Introduction to Node.js',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    location: 'Online',
    category: 'Workshop',
    description: 'Beginner-friendly introduction to Node.js backend development',
    organizer: 'Prachi Garg',
    capacity: 75,
    registered: 68,
  },
  {
    id: '5',
    title: 'Past Event: Database Design Best Practices',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    location: 'Conference Room B',
    category: 'Talk',
    description: 'Explore database design patterns and optimization techniques',
    organizer: 'Admin User',
    capacity: 60,
    registered: 52,
  },
];

// Mock Notifications Database
const mockNotifications = [
  {
    id: '1',
    userId: '1',
    title: 'Event Registered Successfully',
    message: 'You have successfully registered for "React Workshop: Building Modern UIs"',
    type: 'success',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    userId: '1',
    title: 'Upcoming Event Reminder',
    message: 'Reminder: "Keynote: The Future of Web Development" starts in 2 days',
    type: 'info',
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: '3',
    userId: '1',
    title: 'New Message',
    message: 'You have a new message from Admin User',
    type: 'info',
    read: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    userId: '2',
    title: 'New User Registration',
    message: 'New user "John Doe" has registered for an event',
    type: 'info',
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
];

// Mock Messages Database
const mockMessages = [
  {
    id: '1',
    senderId: '1',
    senderName: 'Prachi Garg',
    receiverId: '2',
    receiverName: 'Admin User',
    subject: 'Event Workshop Questions',
    content: 'Hi, I have some questions about the React workshop. Can we discuss the prerequisites?',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: '2',
    senderId: '2',
    senderName: 'Admin User',
    receiverId: '1',
    receiverName: 'Prachi Garg',
    subject: 'Re: Event Workshop Questions',
    content: 'Sure! The workshop requires basic JavaScript knowledge. Let me send you the prerequisites document.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: '3',
    senderId: '3',
    senderName: 'John Doe',
    receiverId: '1',
    receiverName: 'Prachi Garg',
    subject: 'Community Outreach Participation',
    content: 'Hi Prachi, I would love to participate in the community outreach campaign. How can I help?',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    read: true,
  },
];

// Mock Favorites Database
const mockFavorites = [
  {
    id: '1',
    userId: '1',
    eventId: '1',
    eventTitle: 'React Workshop: Building Modern UIs',
    addedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    userId: '1',
    eventId: '2',
    eventTitle: 'Keynote: The Future of Web Development',
    addedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    userId: '3',
    eventId: '3',
    eventTitle: 'Community Outreach Campaign',
    addedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
];

// Mock Settings Database
const mockSettings = [
  {
    userId: '1',
    theme: 'light',
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    eventReminders: true,
  },
  {
    userId: '2',
    theme: 'dark',
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: false,
    eventReminders: true,
  },
  {
    userId: '3',
    theme: 'light',
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    eventReminders: false,
  },
];

// In-memory database state
let dbState = {
  users: JSON.parse(JSON.stringify(mockUsers)),
  events: JSON.parse(JSON.stringify(mockEvents)),
  notifications: JSON.parse(JSON.stringify(mockNotifications)),
  messages: JSON.parse(JSON.stringify(mockMessages)),
  favorites: JSON.parse(JSON.stringify(mockFavorites)),
  settings: JSON.parse(JSON.stringify(mockSettings)),
};

// Mock data service
export const mockDataService = {
  // ============ User Operations ============
  findUserByEmail: (email) => {
    return dbState.users.find(u => u.email === email) || null;
  },

  findUserById: (id) => {
    return dbState.users.find(u => u.id === id) || null;
  },

  createUser: (userData) => {
    const newUser = {
      id: String(dbState.users.length + 1),
      ...userData,
      createdAt: new Date(),
    };
    dbState.users.push(newUser);
    return newUser;
  },

  updateUser: (id, updates) => {
    const user = dbState.users.find(u => u.id === id);
    if (user) {
      Object.assign(user, updates);
      return user;
    }
    return null;
  },

  // ============ Event Operations ============
  getEvents: (filters = {}) => {
    let filtered = [...dbState.events];

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(e => e.category === filters.category);
    }

    if (filters.timeFilter === 'upcoming') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      filtered = filtered.filter(e => {
        const eventDate = new Date(e.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
      });
    } else if (filters.timeFilter === 'past') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      filtered = filtered.filter(e => {
        const eventDate = new Date(e.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate < today;
      });
    }

    return filtered;
  },

  getEventById: (id) => {
    return dbState.events.find(e => e.id === id) || null;
  },

  createEvent: (eventData) => {
    const newEvent = {
      id: String(dbState.events.length + 1),
      ...eventData,
      createdAt: new Date(),
    };
    dbState.events.push(newEvent);
    return newEvent;
  },

  updateEvent: (id, updates) => {
    const event = dbState.events.find(e => e.id === id);
    if (event) {
      Object.assign(event, updates);
      return event;
    }
    return null;
  },

  deleteEvent: (id) => {
    const index = dbState.events.findIndex(e => e.id === id);
    if (index !== -1) {
      return dbState.events.splice(index, 1)[0];
    }
    return null;
  },

  // ============ Notification Operations ============
  getNotificationsByUserId: (userId) => {
    return dbState.notifications.filter(n => n.userId === userId);
  },

  markNotificationAsRead: (notificationId) => {
    const notification = dbState.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      return notification;
    }
    return null;
  },

  deleteNotification: (notificationId) => {
    const index = dbState.notifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      return dbState.notifications.splice(index, 1)[0];
    }
    return null;
  },

  createNotification: (notificationData) => {
    const newNotification = {
      id: String(dbState.notifications.length + 1),
      ...notificationData,
      createdAt: new Date(),
    };
    dbState.notifications.push(newNotification);
    return newNotification;
  },

  // ============ Message Operations ============
  getMessagesByUserId: (userId) => {
    return dbState.messages.filter(m => m.receiverId === userId);
  },

  getSentMessagesByUserId: (userId) => {
    return dbState.messages.filter(m => m.senderId === userId);
  },

  markMessageAsRead: (messageId) => {
    const message = dbState.messages.find(m => m.id === messageId);
    if (message) {
      message.read = true;
      return message;
    }
    return null;
  },

  deleteMessage: (messageId) => {
    const index = dbState.messages.findIndex(m => m.id === messageId);
    if (index !== -1) {
      return dbState.messages.splice(index, 1)[0];
    }
    return null;
  },

  createMessage: (messageData) => {
    const newMessage = {
      id: String(dbState.messages.length + 1),
      ...messageData,
      timestamp: new Date(),
    };
    dbState.messages.push(newMessage);
    return newMessage;
  },

  // ============ Favorites Operations ============
  getFavoritesByUserId: (userId) => {
    return dbState.favorites.filter(f => f.userId === userId);
  },

  addFavorite: (userId, eventId, eventTitle) => {
    const favorite = {
      id: String(dbState.favorites.length + 1),
      userId,
      eventId,
      eventTitle,
      addedAt: new Date(),
    };
    dbState.favorites.push(favorite);
    return favorite;
  },

  removeFavorite: (userId, eventId) => {
    const index = dbState.favorites.findIndex(f => f.userId === userId && f.eventId === eventId);
    if (index !== -1) {
      return dbState.favorites.splice(index, 1)[0];
    }
    return null;
  },

  isFavorite: (userId, eventId) => {
    return dbState.favorites.some(f => f.userId === userId && f.eventId === eventId);
  },

  // ============ Settings Operations ============
  getUserSettings: (userId) => {
    let settings = dbState.settings.find(s => s.userId === userId);
    if (!settings) {
      settings = {
        userId,
        theme: 'light',
        emailNotifications: true,
        pushNotifications: true,
        weeklyDigest: true,
        eventReminders: true,
      };
      dbState.settings.push(settings);
    }
    return settings;
  },

  updateUserSettings: (userId, updates) => {
    let settings = dbState.settings.find(s => s.userId === userId);
    if (settings) {
      Object.assign(settings, updates);
    } else {
      settings = { userId, ...updates };
      dbState.settings.push(settings);
    }
    return settings;
  },

  // ============ Helper Functions ============
  generateToken: (userId) => {
    return `token_${userId}_${Date.now()}`;
  },

  resetDatabase: () => {
    dbState = {
      users: JSON.parse(JSON.stringify(mockUsers)),
      events: JSON.parse(JSON.stringify(mockEvents)),
      notifications: JSON.parse(JSON.stringify(mockNotifications)),
      messages: JSON.parse(JSON.stringify(mockMessages)),
      favorites: JSON.parse(JSON.stringify(mockFavorites)),
      settings: JSON.parse(JSON.stringify(mockSettings)),
    };
  },
};

export default mockDataService;
