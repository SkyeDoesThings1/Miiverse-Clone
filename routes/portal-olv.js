console.log(
  '[Startup] Attempting to create Portal subdomain...'.brightYellow.bold
);

const express = require('express');
const colors = require('colors');
const router = express.Router();

router.get('/titles/show', (req, res) => {
  res.render('index');
});

module.exports = router;
