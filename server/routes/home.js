const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to The World Center for Torah Products, Tefillin, Mezuzah and Judaica');
});

module.exports = router;
