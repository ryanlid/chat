const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('transfer/index');
});

module.exports = router;
