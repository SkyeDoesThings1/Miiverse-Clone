const express = require('express');
const subdomain = require('express-subdomain');
const colors = require('colors');
const discovery = require('./routes/disc-olv');
const config = require('./config.json');
const app = express();
const port = config.port;

try {
  app.use(subdomain('disc.olv', discovery));
  console.log(
    '[Success] Successfully created Discovery subdomain'.brightGreen.bold
  );
} catch (error) {
  console.error(
    '[Error] Could not create Discovery subdomain!'.brightRed.bold,
    error
  );
}

app.listen(port, () => {
  console.log(`Server running on port: ${port}`.brightBlue.bold);
});
