const mongoose = require('mongoose');
const commentCtrl = new mongoose.Schema({
    content:{
        type: String,
        require : true
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});

const Comment = mongoose.model('Comment', commentCtrl);
module.exports = Comment;