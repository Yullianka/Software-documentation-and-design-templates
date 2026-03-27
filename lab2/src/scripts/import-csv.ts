import * as http from 'http';

const data = JSON.stringify({
  filePath: './data/rides.csv',
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/import/csv',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = http.request(options, (res) => {
  let responseBody = '';
  
  res.on('data', (chunk) => {
    responseBody += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 201) {
      console.log('✅ Import successful!');
      console.log('Result:', JSON.parse(responseBody));
    } else {
      console.error(`❌ Import failed with status ${res.statusCode}`);
      console.error('Response:', responseBody);
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ Problem with request: ${e.message}`);
  console.error('Make sure the NestJS server is running (npm run start:dev)');
});

req.write(data);
req.end();
