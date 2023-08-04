const express = require('express');
const router = express.Router();
const passport = require('passport');

const postCtrl = require('../controllers/postCtrl');

router.post('/create',passport.checkAuthentication,postCtrl.create);
router.get('/destroy/:id',passport.checkAuthentication,postCtrl.destroy);

module.exports = router;