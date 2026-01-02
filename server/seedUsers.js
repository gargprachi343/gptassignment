const axios = require('axios');

const API_BASE_URL = 'http://localhost:5001/api';

async function seedUsers() {
  try {
    console.log('🌱 Seeding test users...\n');

    const testUsers = [
      {
        name: 'Prachi Garg',
        email: 'prachi.garg@example.com',
        password: 'password123',
        passwordConfirm: 'password123',
      },
      {
        name: 'Devesh Kumar',
        email: 'devesh.kumar@example.com',
        password: 'password123',
        passwordConfirm: 'password123',
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        passwordConfirm: 'admin123',
      },
    ];

    for (const user of testUsers) {
      try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, user);
        console.log(`✅ Created user: ${user.email}`);
      } catch (error) {
        if (error.response && error.response.status === 409) {
          console.log(`⚠️  User already exists: ${user.email}`);
        } else {
          console.error(`❌ Failed to create user ${user.email}:`, error.response?.data?.message || error.message);
        }
      }
    }

    console.log('\n✨ Done!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedUsers();
