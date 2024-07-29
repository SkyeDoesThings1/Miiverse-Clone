const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const config = require('./config.json');
const app = express();
const port = config.port;
const middleware = require('./middleware/middleware');

const privateKey = fs.readFileSync(
  path.join(__dirname, 'certs', 'key.pem'),
  'utf8',
);
const certificate = fs.readFileSync(
  path.join(__dirname, 'certs', 'cert.pem'),
  'utf8',
);
const credentials = { key: privateKey, cert: certificate };

middleware(app);

https.createServer(credentials, app).listen(port, () => {
  console.log(`Server running on port: ${port}`.brightBlue.bold);
});
