const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.send('an order is recieved'));

module.exports = router;