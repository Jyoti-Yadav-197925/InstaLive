const express = require('express');
const router = express.Router();
const passport = require('passport');

const commenCtrller = require('../controllers/cmtCtrl');

router.post('/create',passport.checkAuthentication,commenCtrller.create);
router.get('/destroy/:id',passport.checkAuthentication,commenCtrller.destroy);
module.exports = router;