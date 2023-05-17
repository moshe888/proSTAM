const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('About The World Center for Torah Products, Tefillin, Mezuzah and Judaica');
});

module.exports = router;
