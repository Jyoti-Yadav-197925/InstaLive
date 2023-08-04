const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/trial');
const db = mongoose.connection;
db.on('error',console.error.bind(console,'error in connection to db'));
db.once('open',()=>{
    console.log("db has been connected");
});
module.exports = db;