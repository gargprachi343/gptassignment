// Test the login endpoint directly
const http = require('http');

const data = JSON.stringify({
  email: 'prachi.garg@example.com',
  password: 'password123'
});

const options = {
  hostname: 'localhost',
  port: 5001,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Headers:', res.headers);
    console.log('Body:', responseData);
    try {
      const json = JSON.parse(responseData);
      console.log('Parsed:', json);
    } catch (e) {
      console.log('Failed to parse as JSON');
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

console.log('Sending request to http://localhost:5001/api/auth/login');
req.write(data);
req.end();
