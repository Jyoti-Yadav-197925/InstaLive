const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeCont = require('../controllers/usersCtrl');
// router.get('/', homeCont.home);
console.log("users route has loaded");
router.get('/profile/:id',passport.checkAuthentication,homeCont.profile);
router.post('/update/:id',passport.checkAuthentication,homeCont.update);
router.get('/signup',homeCont.signup);
router.get('/signin',homeCont.signin);
router.post('/create_session',homeCont.create_session);
router.post('/create',passport.authenticate(
    'local',{
        failureRedirect:'/users/signin'
    },
),homeCont.create);

router.get('/signout',homeCont.destroySession);

module.exports = router;