const express =require('express');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const passport =require('passport');
const passportlocal = require('./config/passport');
const session = require('express-session');
const flash = require('connect-flash');
const custoMware = require('./config/middleware');

app.set('view engine','ejs');
app.set('views','./views');


app.use(express.urlencoded());

app.use(express.static('./assets'));

app.use(expressLayouts)
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(cookieParser());

app.use(session({
    name: 'Insta-Live',
    secret: "hashsomething",
    saveUninitialized:false,//while signin we don't wont that much of the information shld be at homepage...
    resave:false,  //for not saving the data again & again
    cookie:{
        maxAge:(1000*60*100)
    // },
    // function(err){
    //     console.log(err || 'connected-to-mongo-db');
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(custoMware.setFlash);



app.use('/',require('./routes'));

app.listen(port,()=>{
    console.log("SERVER IS UP: ",port);
})