const mongoose = require('mongoose');
const User = require('./models/User');

async function seedUsers() {
  await mongoose.connect('mongodb://127.0.0.1:27017/event_management');

  // 🔥 IMPORTANT: delete old broken users
  await User.deleteMany({
    email: { $in: ['prachi.garg@example.com', 'admin@example.com'] }
  });

  await User.create({
    name: 'Prachi Garg',
    email: 'prachi.garg@example.com',
    password: 'password123', // ✅ plain
    role: 'user'
  });

  await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123', // ✅ plain
    role: 'admin'
  });

  console.log('✅ Users seeded correctly');
  process.exit(0);
}

seedUsers();
