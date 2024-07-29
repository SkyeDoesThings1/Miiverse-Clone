const express = require('express');
const router = express.Router();

router.get('/titles/show', (req, res) => {
  res.render('portal/index');
});
