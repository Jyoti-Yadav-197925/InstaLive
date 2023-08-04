const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user');


passport.use(
    new LocalStrategy({
        usernameField:'email',
        passReqToCallback:true
    },
    async(req,email,password,done)=>{
    try{
        console.log('heellloo')
        const user = await User.findOne({email:email});
        if(!user || user.password !== password){
            // console.log("Passwords or Username is incorrect");
            req.flash("success","Username/Password is incorrect");
            return done(null,false);
        }
        return done(null,user);
    }catch(e){
        // console.log("error in signup--passport",e);
        req.flash("error",e);
        return done(e);
    }
    }
    )
);

passport.serializeUser(async(user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    try{
        const user = await User.findById(id);
        return done(null,user);
    }catch(e){
        console.log("error in finding the user through--passport");
        return done(e);
    }
});

passport.checkAuthentication = ((req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/signin');
});

passport.setAuthenticatedUser = ((req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();

});

module.exports = passport;
