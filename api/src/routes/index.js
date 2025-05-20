const express = require('express');
const router = express.Router();

const postRoutes = require('./postRoutes');

router.use('/posts', postRoutes);

module.exports = router;
