// Mock user store for when MongoDB is unavailable
const mockUsers = [
  {
    _id: '507f1f77bcf86cd799439011',
    name: 'Prachi Garg',
    email: 'prachi.garg@example.com',
    password: 'password123', // Plain text for testing (in production, use hashed)
    role: 'user',
    isActive: true,
    createdAt: new Date('2025-12-01'),
  },
  {
    _id: '507f1f77bcf86cd799439012',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123', // Plain text for testing (in production, use hashed)
    role: 'admin',
    isActive: true,
    createdAt: new Date('2025-12-01'),
  },
];

// In-memory database
const inMemoryDB = {
  users: [...mockUsers],
};

// Helper functions for in-memory operations
const mockDB = {
  findUserByEmail: (email) => {
    return inMemoryDB.users.find(u => u.email === email);
  },
  
  findUserById: (id) => {
    return inMemoryDB.users.find(u => u._id === id);
  },
  
  createUser: (userData) => {
    const newUser = {
      _id: Date.now().toString(),
      ...userData,
      createdAt: new Date(),
    };
    inMemoryDB.users.push(newUser);
    return newUser;
  },
  
  updateUser: (id, updates) => {
    const user = inMemoryDB.users.find(u => u._id === id);
    if (user) {
      Object.assign(user, updates);
      return user;
    }
    return null;
  },
  
  deleteUser: (id) => {
    const index = inMemoryDB.users.findIndex(u => u._id === id);
    if (index !== -1) {
      return inMemoryDB.users.splice(index, 1)[0];
    }
    return null;
  },
  
  getAllUsers: () => {
    return inMemoryDB.users;
  },
};

module.exports = mockDB;
