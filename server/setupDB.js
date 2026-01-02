const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Event = require('./models/Event');
const Notification = require('./models/Notification');
const Message = require('./models/Message');
const Settings = require('./models/Settings');
const User = require('./models/User');

async function setupDatabase() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || 'event_management',
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Create collections and indexes
    console.log('\n📋 Creating collections and indexes...\n');
    
    // Events collection
    console.log('Creating Events collection...');
    await Event.collection.createIndex({ category: 1 });
    await Event.collection.createIndex({ date: 1 });
    await Event.collection.createIndex({ status: 1 });
    console.log('✅ Events collection created');
    
    // Notifications collection
    console.log('Creating Notifications collection...');
    await Notification.collection.createIndex({ audience: 1 });
    await Notification.collection.createIndex({ read: 1 });
    await Notification.collection.createIndex({ createdAt: -1 });
    console.log('✅ Notifications collection created');
    
    // Messages collection
    console.log('Creating Messages collection...');
    await Message.collection.createIndex({ createdAt: -1 });
    await Message.collection.createIndex({ read: 1 });
    console.log('✅ Messages collection created');
    
    // Settings collection
    console.log('Creating Settings collection...');
    await Settings.collection.createIndex({ userId: 1 }, { unique: true });
    console.log('✅ Settings collection created');
    
    // Users collection
    console.log('Creating Users collection...');
    try {
      await User.collection.createIndex({ userId: 1 }, { unique: true });
    } catch (e) {
      console.log('   (userId index already exists)');
    }
    try {
      await User.collection.createIndex({ email: 1 }, { unique: true, sparse: true });
    } catch (e) {
      console.log('   (email index already exists)');
    }
    console.log('✅ Users collection created');
    
    // Seed sample data
    console.log('\n📝 Seeding sample data...\n');
    
    // Clear existing data (optional - comment out to keep data)
    await Event.deleteMany({});
    await Notification.deleteMany({});
    await Message.deleteMany({});
    await User.deleteMany({});
    await Settings.deleteMany({});
    
    // Create sample events
    const events = await Event.insertMany([
      {
        title: 'Web Design Workshop',
        description: 'Learn modern web design principles and best practices',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        time: '10:00 AM',
        location: 'Mumbai, India',
        capacity: 50,
        registrations: 32,
        category: 'web-design',
        status: 'upcoming',
        createdBy: 'admin1',
      },
      {
        title: 'JavaScript Advanced Concepts',
        description: 'Deep dive into JavaScript ES6+ features and async programming',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        time: '2:00 PM',
        location: 'Delhi, India',
        capacity: 40,
        registrations: 28,
        category: 'javascript',
        status: 'upcoming',
        createdBy: 'admin1',
      },
      {
        title: 'React Advanced Workshop',
        description: 'Master React hooks, context, and performance optimization',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        time: '3:00 PM',
        location: 'Bangalore, India',
        capacity: 35,
        registrations: 22,
        category: 'react',
        status: 'upcoming',
        createdBy: 'admin1',
      },
      {
        title: 'Tech Talk: AI & Machine Learning',
        description: 'Introduction to AI and ML in modern applications',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        time: '4:00 PM',
        location: 'Pune, India',
        capacity: 100,
        registrations: 2,
        category: 'ai-ml',
        status: 'upcoming',
        createdBy: 'admin2',
      },
    ]);
    console.log(`✅ Created ${events.length} sample events`);
    
    // Create sample notifications
    const notifications = await Notification.insertMany([
      {
        title: 'Event Submitted for Review',
        message: 'Prachi Garg has submitted a new Workshop Event that is pending your approval.',
        type: 'event',
        audience: 'admin',
        read: false,
      },
      {
        title: 'Low Attendance Alert',
        message: 'Tech Talk event has only 2 registrations. Please take action to increase attendance.',
        type: 'warning',
        audience: 'admin',
        read: false,
      },
      {
        title: 'User Report Submitted',
        message: 'Devesh Kumar has submitted an issue report for the Web Design event.',
        type: 'info',
        audience: 'admin',
        read: true,
      },
      {
        title: 'Event Registration Confirmed',
        message: 'You have successfully registered for the Web Design Workshop. A confirmation email has been sent to you.',
        type: 'event',
        audience: 'user',
        read: false,
      },
      {
        title: 'Event Reminder',
        message: 'JavaScript Workshop starts in 2 hours! Please prepare your materials and join on time.',
        type: 'warning',
        audience: 'user',
        read: false,
      },
      {
        title: 'New Event Available',
        message: 'React Advanced workshop has been added based on your interests. Register now.',
        type: 'info',
        audience: 'user',
        read: true,
      },
    ]);
    console.log(`✅ Created ${notifications.length} sample notifications`);
    
    // Create sample messages
    const messages = await Message.insertMany([
      {
        senderName: 'Prachi Garg (System)',
        senderRole: 'system',
        content: 'Please review and approve the pending events in the dashboard.',
        read: false,
      },
      {
        senderName: 'Devesh Kumar (User)',
        senderRole: 'user',
        content: 'Can I increase the capacity for the Workshop event?',
        read: false,
      },
      {
        senderName: 'Prachi Garg (Admin)',
        senderRole: 'admin',
        content: 'The Web Design Workshop has been rescheduled for next Friday. Please confirm your attendance.',
        read: false,
      },
      {
        senderName: 'Event Team (Admin)',
        senderRole: 'admin',
        content: 'Thank you for registering! You will receive event details via email. Contact us for any questions.',
        read: false,
      },
    ]);
    console.log(`✅ Created ${messages.length} sample messages`);
    
    // Create sample users
    const users = await User.insertMany([
      {
        name: 'Prachi Garg',
        email: 'prachi.garg@example.com',
        password: 'password123',
        role: 'user',
        favorites: events.slice(0, 2).map(e => e._id),
        history: events.slice(0, 1).map(e => e._id),
      },
      {
        name: 'Devesh Kumar',
        email: 'devesh.kumar@example.com',
        password: 'password123',
        role: 'user',
        favorites: events.slice(1, 3).map(e => e._id),
        history: [],
      },
      {
        name: 'Prachi Garg',
        email: 'admin1@example.com',
        password: 'admin123',
        role: 'admin',
        favorites: [],
        history: [],
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
        favorites: [],
        history: [],
      },
    ]);
    console.log(`✅ Created ${users.length} sample users`);
    
    // Create sample settings
    const settings = await Settings.insertMany([
      {
        userId: 'user1',
        emailNotifications: true,
        pushNotifications: true,
        soundEnabled: true,
        compactView: false,
        showEventDetails: true,
        autoMarkAsRead: false,
        theme: 'light',
      },
      {
        userId: 'user2',
        emailNotifications: false,
        pushNotifications: true,
        soundEnabled: false,
        compactView: true,
        showEventDetails: false,
        autoMarkAsRead: true,
        theme: 'dark',
      },
      {
        userId: 'admin1',
        emailNotifications: true,
        pushNotifications: true,
        soundEnabled: true,
        compactView: false,
        showEventDetails: true,
        autoMarkAsRead: false,
        theme: 'light',
      },
    ]);
    console.log(`✅ Created ${settings.length} sample settings`);
    
    console.log('\n✨ Database setup complete!');
    console.log('📊 Collections created:');
    console.log('   - events (with indexes)');
    console.log('   - notifications (with indexes)');
    console.log('   - messages (with indexes)');
    console.log('   - settings (with indexes)');
    console.log('   - users (with indexes)');
    console.log('\n📋 Sample Data:');
    console.log(`   - ${events.length} events`);
    console.log(`   - ${notifications.length} notifications`);
    console.log(`   - ${messages.length} messages`);
    console.log(`   - ${users.length} users`);
    console.log(`   - ${settings.length} settings`);
    
    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  }
}

setupDatabase();
