const express = require('express');
const router = express.Router();
const homeCont = require('../controllers/homeCtrl');

console.log("index route has loaded");
router.get('/', homeCont.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
module.exports = router;